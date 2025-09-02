export default class Formatters {
    public readonly numbers: Numbers;

    constructor(private locale: string) {
        this.numbers = new Numbers(locale);
    }
}

class Numbers {
    constructor(private locale: string) {}

    formatCurrency(value: number): string {
        return value.toLocaleString(this.locale, { style: 'currency', currency: 'BRL' });
    }
    formatInt(value: number): string {
        return value.toLocaleString(this.locale, { maximumFractionDigits: 0 });
    }
    formatNumber(value: number, options: Intl.NumberFormatOptions = {}): string {
        return value.toLocaleString(this.locale, options);
    }
}
