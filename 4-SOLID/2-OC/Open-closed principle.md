# Open-closed principle

"A module should be open for extension but closed for modification".

As Robert C. Martin says, "Of all the principles of object oriented design, this is the most important.".

## Origins

It is coming from Bertrand Meyer's book "Object-Oriented Software Construction" from 1988 and it means "We should write our modules so that they can be extended, without requiring them to be modified. In other
words, we want to be able to change what the modules do, without changing the source code of the modules".

It means we need to implement such Class structure that will allow us to plug, pass new instances, but without direct code changes of this Class.

Why it is important? If you have a working, tested code - the less you change the code the better. And if you have a chance not to modify the code - this is what we need to have.

It means we need to learn to write code that should be safe from any changes. This is a weird but important concept.

## Implementation of Open-closed principle

As Martin says, Abstraction is the key to this principle. And he says even if this principle can't be fully achieved, the partial compliance can be for good.

Bad example:

```typescript
class Order {
  id: number;
  items: string[];
  shipping: string;

  getTotalCost(): number {}

  // Bunch of if-else conditions that you will need to change once any of the sipping vendors change
  getShippingCosts(): number {
    const totalCost = this.getTotalCost();

    if (this.shipping === "ground") {
      return totalCost > 50 ? 0 : 5.95;
    }

    if (this.shipping === "air") {
      return 10.95;
    }

    return 0;
  }
}
```

Good example:

```typescript
interface IShipping {
  getShippingCosts(totalCost: number): number;
}

// We are using polymorphism of OOP here
class Ground implements IShipping {
  getShippingCosts(totalCost: number): number {
    return totalCost > 50 ? 0 : 5.95;
  }
}

class Air implements IShipping {
  getShippingCosts(): number {
    return 10.95;
  }
}

class PickUpInStore implements IShipping {
  getShippingCosts(): number {
    return 0;
  }
}

class Order {
  id: number;
  items: string[];
  shipping: IShipping;

  constructor(id: number, items: string[], shipping: IShipping) {
    this.id = id;
    this.items = items;
    this.shipping = shipping;
    // other properties
  }

  // We can extend it, add new methods, but we don't need to modify methods
  getTotalCost(): number {}

  // Here we don;t need to modify the code because of the Shipping service changes or updates
  getShippingCosts(): number {
    const totalCost = this.getTotalCost();

    // We don't know explicitly here what class we use for shipping cost calculations
    return baseCost + this.shipping.getShippingCosts(baseCost);
  }
}

// Usage example:
const airShipping = new Air();
const groundSHipping = new Ground();
const pickUpInStore = new PickUpInStore();

const groundOrder = new Order(1, ["Laptop"], airShipping);
console.log(groundOrder.getShippingCosts());

const airOrder = new Order(2, ["Mouse"], airShipping);
console.log(airOrder.getShippingCosts());
```

Another example of this principle is a restaurant. We have kitchen with Chef, Waiter and Customer.

- Chef is the main food Provider.
- Waiter is the interface.
- Customer is the consumer of Provider data.

When we have a new recipe, the Waiter is the connection point that can tell that Chef can cook a new thing to Customer. It doesn't mean that we need to redesign our kitchen or change table for Customer.
We simply inform Customer and serve the new dish on the same table.

Chef should not tell a lot of details about the food vendors, kitchen furniture or the number of knives to Waiter or Customer.
Waiter knows about the recipe (high-level), about the preparation time, taste, they can make order or cancel the incoming order from Customer. Waiter is the connection between Chef and Customer.
Customer knows about the dish, price and preparation time. But they don't need to know or see the Chef. They need only Waiter.

- If we have a new Customer - Chef and Waiter doesn't care at all. Chef will prepare the ordered dish and give it to Waiter.
- If we have a new Chef - Waiter and Customer doesn't care at all. New Chef will prepare the ordered dish and give it to Waiter. Waiter will give it to Customer.
- If we have a new Waiter - Chef and Customer doesn't care at all. Waiter will do the same role.
- If we have a new dish - Chef will update the menu, will tell Waiter about it, but it is up to Customer to use it or not.
