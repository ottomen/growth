import { produce } from "immer";

interface ISession {
  id: string;
  username: string;
  email: string;
  status: "enabled" | "disabled";
}

const session: ISession = {
  id: crypto.randomUUID(),
  username: "jimbeam",
  email: "some@gmail.com",
  status: "disabled",
};

// With Immer, this process is more straightforward.
// We can leverage the "produce" function, which takes as first argument the "state" we want to start from,
// and as second argument we pass a function, called the "recipe", that is passed a "draft" to which
// we can apply straightforward mutations.
// Those mutations are recorded and used to produce the next state once the recipe is done.
// "produce" will take care of all the necessary copying,
// and protect against future accidental modifications as well by freezing the data.

// https://immerjs.github.io/immer/produce
const nextSession = produce(session, (draft) => {
  // we mutate the copy, via Revocable.proxy
  // "draft" is a special kind of mutable wrapper via Proxy
  draft.status = "enabled";
});

console.log(session);
console.log(nextSession);

