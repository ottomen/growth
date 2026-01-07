# Primitives vs Objects

This is the foundational piece of knowledge every programmer should know.

We have primitive data types: `number`, `string`, `null`, `undefined`, `boolean`, `Symbol`, `BigInt`.
We have complex data types: `array`, `object`, but in JS language `array`, `object` or `function` are essentially objects.

**Primitives in JS are immutable**. When you manipulate a primitive, you are creating a new value, not modifying the old one. And you pass the primitive into function, or return from function as a value. Data is spatially local in RAM memory.

**Objects are mutable**. When you change the variable of an object you are basically re-assigning the link to the memory, if you change a part of the object - you are mutating the original object in the memory by the link. Data is spatially fragmented. Each pointer points to a potentially random location in RAM.

The distinction between primitives and pointers/links is fundamentally a trade-off dictated by the Von Neumann architecture and is the primary driver of the Von Neumann Bottleneck. Modern CPUs use caches (L1, L2, L3) and hardware pre-fetchers to hide the Von Neumann Bottleneck.

The distinction between primitives and pointers/links is the fundamental high-level abstraction of the Von Neumann Architecture physical constraints.

Every C-type language handles this trade-off, though they use different terminology. I mean: C, C++, C#, Java, JS.

## Historical references of Von Neumann architecture

It all goes in to [Von Neumann architecture](https://en.wikipedia.org/wiki/Von_Neumann_architecture) from 1950s, that is the standard for most of the devices we use.

[<img src="./images/central_processing_unit.webp" width="550"/>](./images/central_processing_unit.webp)

The Von Neumann architecture is the physical implementation of the logic established by Alan Turing Universal Turing Machine.

- CPU (Central Arithmetic Unit) - performs binary math (addition, subtraction, AND/OR logic) on "values" pulled from memory.
- Central Control Unit - this is the part of the CPU chip that manages the instruction cycle. It fetches code from the RAM, decodes what the code wants to do, and then sends electrical signals to the Arithmetic Unit to execute it.
- RAM (Memory) - it is a massive, high-speed grid of cells. Every primitive (value) and object (link/pointer) must be loaded here before the CPU can see it.
- SSD - long term memory. The CPU cannot "talk" to the SSD directly; it must request the data be moved to RAM first.
- Keyboard / Monitor (Input & Output Mechanisms)

## Von Neumann Bottleneck

The Von Neumann bottleneck is a performance limitation where the CPU waits for data to travel from memory over a shared bus, creating a slowdown because processor speeds far outpace memory transfer speeds. This bottleneck occurs because both instructions and data use the same communication channel, limiting throughput as CPUs get much faster than memory, making them wait for data to be fetched and stored.

- Shared Bus: In the Von Neumann architecture, a single bus (communication pathway) carries both program instructions and data between the CPU and main memory.
- Sequential Access: Because they share the bus, instructions and data cannot be fetched simultaneously, one must wait for the other.
- Speed Disparity: CPU speeds have increased much faster than memory access speeds, meaning the CPU often finishes its calculations quickly but has to wait for data to arrive or be saved.

**Mitigation strategies**

- Caching: Using small, fast memory (cache) closer to the CPU to store frequently used data and instructions.
- Prefetching: Predicting needed data and loading it into the cache before the CPU requests it.
- Multithreading/Parallelism: Processing multiple requests simultaneously to keep the CPU busy.
- Architectural Changes: Moving towards non-Von Neumann designs, such as the Harvard architecture (separate buses for instructions and data) or neuromorphic computing where processing happens closer to or within the memory.

Idea of pointers/links and values was invented as a way to utilize memory and hardware part more effectively (CPU-RAM Interface). While primitive data types have their limits, you can construct an object that can be enormous (JSON, for example). So instead of passing objects by value, we pass them by pointer/link.
Every time you propagate the variable of object, function or array, you are not propagating the value, but a link to the specific part in heap memory.

## Why do we care about that stuff?

This is the foundational principle for every device based on Von Neumann, starting from immutability, idempotence, programming paradigms, algorithms, effective memory management.

On the utilitarian level if you don't know that mutating an object passed into function will lead to side effects that can break the logic out of that function - you are in a trouble.

It is especially important in React world, where we have an idea of props drilling, arguments, and these are bad practices:

```tsx

// Example 1: Every re-render creates a new object in memory that will trigger re-render of the <SomeComponent>
<SomeComponent data={{id: '', payload: payload}}/>

// Example 2: We need to be mindful what to do with the "data" object, do we need to apply memoization or not, about the trade-offs
export const SomeComponent = ({ data }) => {
    const filteredData = data.payload.filter((item) => {...});
    //...
}

// Example 3: We create an object and propagate it to chain of functions, where we have a possibility of mutations
const data = {id: '', payload: [{...}], createdAt: new Date()}

function filterActiveItems(data) {
    return data.payload.filter((item) => {...});
}

function mapItems(data) {
    // Boom, we mutated the original object
    data.createdAt = new Date();
}

filterActiveItems(data);
mapItems(data);

// Example 4: The Dependency array trap
const UserProfile = ({ userId }) => {
    // This object 'options' is a new link on every render
    const options = { precision: 'high', theme: 'dark' };

    useEffect(() => {
        console.log("Fetching data with options...");
    }, [options]); // Boom: This runs on every render, even if 'options' values are identical.
};

// Example 5: Shallow copying and nested mutations
const originalState = {
    id: 1,
    metadata: {
        lastLogin: '2025-01-01',
        tags: ['admin', 'editor']
    }
};

// We are kind of safe here?
const newState = { ...originalState };

function updateTags(state) {
    // Boom: 'metadata' is a LINK. You just mutated the originalState.
    state.metadata.tags.push('viewer');
}
```

## Once more

Know the difference between primitives and objects and how they affect your code.

Every time you propagate the variable of object you are not propagating the value, but a link to the specific part in heap memory.

**What to read**:

- [https://en.wikipedia.org/wiki/Von_Neumann_architecture](https://en.wikipedia.org/wiki/Von_Neumann_architecture)
- Can programming be liberated from the von Neumann style?: a functional style and its algebra of programs, Turing Award lecture by John Backus, 1977
