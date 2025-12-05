# Proxy pattern

## Vanilla JS Proxy

The Proxy object enables you to create a proxy for another object, which can intercept and redefine fundamental operations for that object.

```js
const obj = {
  name: "Some",
};

const proxiedObj = new Proxy(obj, {});

console.log(proxiedObj.name);
```

[Vanilla Proxy example](./vanilla-proxy.ts)

Limitations: Proxy does not have direct access to the original object's private elements.

### Use cases:

- Interceptors for original object
- Validation for setter/getter/apply of original object
- Memoization/caching of values
- Logging purposes

## Immer.js

Immer (German for: always) is a tiny package that allows you to work with immutable state in a more convenient way.

Link: https://immerjs.github.io/immer/

```ts
// https://github.com/immerjs/immer/blob/99e59a8d127fac1a3b98f943a90347a46d1779fa/src/core/proxy.ts
export function createProxyProxy<T extends Objectish>(
  base: T,
  parent?: ImmerState
): [Drafted<T, ProxyState>, ProxyState] {
  const baseIsArray = isArray(base);
  const state: ProxyState = {
    type_: baseIsArray ? ArchType.Array : (ArchType.Object as any),
    // Track which produce call this is associated with.
    scope_: parent ? parent.scope_ : getCurrentScope()!,
    // True for both shallow and deep changes.
    modified_: false,
    // Used during finalization.
    finalized_: false,
    // Track which properties have been assigned (true) or deleted (false).
    // actually instantiated in `prepareCopy()`
    assigned_: undefined,
    // The parent draft state.
    parent_: parent,
    // The base state.
    base_: base,
    // The base proxy.
    draft_: null as any, // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null as any,
    isManual_: false,
    // `callbacks` actually gets assigned in `createProxy`
    callbacks_: undefined as any,
  };

  // the traps must target something, a bit like the 'real' base.
  // but also, we need to be able to determine from the target what the relevant state is
  // (to avoid creating traps per instance to capture the state in closure,
  // and to avoid creating weird hidden properties as well)
  // So the trick is to use 'state' as the actual 'target'! (and make sure we intercept everything)
  // Note that in the case of an array, we put the state in an array to have better Reflect defaults ootb
  let target: T = state as any;
  let traps: ProxyHandler<object | Array<any>> = objectTraps;
  if (baseIsArray) {
    target = [state] as any;
    traps = arrayTraps;
  }

  // Factory function is the same as the Proxy() constructor, except that in addition to creating a proxy object, it also creates a revoke function that can be called to disable the proxy.
  const { revoke, proxy } = Proxy.revocable(target, traps);
  state.draft_ = proxy as any;
  state.revoke_ = revoke;
  return [proxy as any, state];
}

// Use case
export function createProxy<T extends Objectish>(
  rootScope: ImmerScope,
  value: T,
  parent?: ImmerState,
  key?: string | number | symbol
): Drafted<T, ImmerState> {
  // precondition: createProxy should be guarded by isDraftable, so we know we can safely draft
  // returning a tuple here lets us skip a proxy access
  // to DRAFT_STATE later
  const [draft, state] = isMap(value)
    ? getPlugin(PluginMapSet).proxyMap_(value, parent)
    : isSet(value)
    ? getPlugin(PluginMapSet).proxySet_(value, parent)
    : createProxyProxy(value, parent); // <==================== Here it is!!!!

  const scope = parent?.scope_ ?? getCurrentScope();
  scope.drafts_.push(draft);

  // Ensure the parent callbacks are passed down so we actually
  // track all callbacks added throughout the tree
  state.callbacks_ = parent?.callbacks_ ?? [];
  state.key_ = key;

  if (parent && key !== undefined) {
    registerChildFinalizationCallback(parent, state, key);
  } else {
    // It's a root draft, register it with the scope
    state.callbacks_.push(function rootDraftCleanup(rootScope) {
      rootScope.mapSetPlugin_?.fixSetContents(state);

      const { patchPlugin_ } = rootScope;

      if (state.modified_ && patchPlugin_) {
        patchPlugin_.generatePatches_(state, [], rootScope);
      }
    });
  }

  return draft as any;
}
```

