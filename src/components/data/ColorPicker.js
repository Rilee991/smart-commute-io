class ColorPicker {
    #colors = [];
    #usedColors = new Set();
    #index = 0;
    #total = 0;

    constructor(colors = []) {
        this.#colors = colors.slice();
        this.#usedColors = new Set();
        this.#index = 0;
        this.#total = colors.length;
    }

    getNextColor = () => {
        if(this.#colors.length === 0) {
            throw new Error("No unique colors available!");
        }

        const color = this.#colors.splice(this.#index, 1)[0];
        this.#usedColors.add(color);
        this.#index = ((this.#index + 1) % this.#total);

        return color;
    }
};

export default ColorPicker;
