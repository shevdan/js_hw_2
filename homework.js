/* DONT CHANGE THIS CODE - START */
function wait(ms = 1000) { return new Promise(resolve => setTimeout(resolve, ms)) }

class Dish {
    constructor(cookingTime) {
        this.cookingTime = cookingTime;
    }

    async cook() {
        const actualCookingTime = this.cookingTime * (1 + Math.random()) * 100;
        await wait(actualCookingTime);
        return this;
    }
}
/* DONT CHANGE THIS CODE - END */

/*
    YOUR CODE HERE
*/
class Ingridient{
    constructor(name, qtty) {
        this.name = name;
        this.qtty = qtty;
    }
}

class Bolognese extends Dish {
    constructor(){
        super(10);
        this.ingridients = [new Ingridient('spaghetti', 1),
                            new Ingridient('meat', 1), 
                             new Ingridient('tomato', 1)]
    }

    async cook(){
        return super.cook();
    }
}

class MashedPotatoes extends Dish {
    constructor(){
        super(8);
        this.ingridients = [new Ingridient('potato', 1)]
    }

    async cook(){
        return super.cook();
    }
}

class Steak extends Dish {
    constructor(){
        super(7);
        this.ingridients = [new Ingridient('meat', 1)]
    }

    async cook(){
        return super.cook();
    }
}

class SteakAndFries extends Dish {
    constructor(){
        super(10);
        this.ingridients = [new Ingridient('potato', 1),
                            new Ingridient('meat', 1)]
    }

    async cook(){
        return super.cook();
    }
}

class Kitchen{

    constructor() {
        this.fridge = [];
        this.orders = [];
    }
    

    addToFridge(ingridients) {
        for(const ingridient of ingridients) {
            this.fridge.push(ingridient);
        }
    }

    order(dish) {
        let flag_ok = true;

        for(const ingridient of dish.ingridients) {
            let found_cur_ingridient = false;
            for (const fridge_contents of this.fridge) {
                if (fridge_contents.name === ingridient.name && fridge_contents.qtty >= ingridient.qtty) {
                    found_cur_ingridient = true;
                    break;
                }
            }
            flag_ok = flag_ok && found_cur_ingridient;
        }
        if (!flag_ok) {
            throw new Error("Not enough ingirdients.")
        }
        for(const ingridient of dish.ingridients) {
            for (const fridge_contents of this.fridge) {
                if (fridge_contents.name === ingridient.name) {
                    fridge_contents.qtty -= ingridient.qtty;
                    break;
                }
            }
        }

        this.orders.push(dish);
    }

    cookFastestOrder() {
        this.orders.sort(function(order1, order2) {
            return order1.cookingTime < order2.cookingTime;
        });
        return this.orders.pop();
    }

    cookAllOrders() {
        let cooked = [...this.orders];
        this.orders = [];
        return cooked;
    }

}

async function test() {
    const kitchen = new Kitchen();
    kitchen.addToFridge([
        new Ingridient('potato', 1),
        new Ingridient('spaghetti', 1),
        new Ingridient('meat', 3),
        new Ingridient('tomato', 2)
    ])

    kitchen.order(new Bolognese()); // Bolognese extends Dish (cookingTime = 10)
    kitchen.order(new MashedPotatoes()); // MashedPotatoes extends Dish (cookingTime = 8)
    kitchen.order(new Steak()); // Steak extends Dish (cookingTime = 7)

    // Feel free to experiment with various dishes and ingridients

    await kitchen.cookFastestOrder(); // Returns fastest dish to make
    await kitchen.cookAllOrders(); // Returns two dishes in array

    kitchen.order(new SteakAndFries()); // Throws Error: Not enough ingridients in fridge
}

test();
