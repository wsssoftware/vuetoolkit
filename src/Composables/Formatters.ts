export default class Formatters {
    public readonly brazilian: Brazilian;
    public readonly datetime: Datetime;
    public readonly numbers: Numbers;

    constructor(locale: string) {
        this.brazilian = new Brazilian();
        this.datetime = new Datetime(locale);
        this.numbers = new Numbers(locale);
    }
}

class Brazilian {
    document(document: string): string {
        const raw = document.replace(/[^a-zA-Z0-9]/g, '');
        if (raw.length === 11) {
            return `${raw.substring(0, 3)}.${raw.substring(3, 6)}.${raw.substring(6, 9)}-${raw.substring(9, 11)}`;
        } else if (raw.length === 14) {
            return `${raw.substring(0, 2)}.${raw.substring(2, 5)}.${raw.substring(5, 8)}/${raw.substring(8, 12)}-${raw.substring(12, 15)}`;
        }
        return raw;
    }

    zip(zip: string): string {
        const raw = zip.replace(/[^0-9]/g, '');
        return `${raw.substring(0, 2)}.${raw.substring(2, 5)}-${raw.substring(5, 8)}`;
    }
}

class Datetime {
    constructor(private locale: string) {}

    date(date: string, options: Intl.DateTimeFormatOptions = null, locale: null | string = null): string {
        return new Date(date).toLocaleDateString(locale ?? this.locale, options ?? {});
    }

    datetime(date: string, options: Intl.DateTimeFormatOptions = null, locale: null | string = null): string {
        return new Date(date).toLocaleString(locale ?? this.locale, options ?? {});
    }

    time(date: string, options: Intl.DateTimeFormatOptions = null, locale: null | string = null): string {
        return new Date(date).toLocaleTimeString(locale ?? this.locale, options ?? {});
    }
}

class Numbers {
    constructor(private locale: string) {}

    currency(value: number): string {
        return value.toLocaleString(this.locale, { style: 'currency', currency: 'BRL' });
    }
    integer(value: number): string {
        return value.toLocaleString(this.locale, { maximumFractionDigits: 0 });
    }
    number(value: number, options: Intl.NumberFormatOptions = {}): string {
        return value.toLocaleString(this.locale, options);
    }
}
