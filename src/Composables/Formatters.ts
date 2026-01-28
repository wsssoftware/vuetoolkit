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

    phone(phone: string): string {
        const raw = phone.replace(/[^0-9]/g, '');

        if (raw.length === 3 && /^1[0-9]{2}$/.test(raw)) {
            return raw;
        } else if (/^[1-9][0-9]9$/.test(raw.substring(0, 3))) {
            return `(${raw.substring(0, 2)}) ${phone.substring(3, 2)}  ${phone.substring(3, 7)}-${phone.substring(7, 11)}`;
        } else if (/^400$/.test(phone.substring(0, 3))) {
            return `${phone.substring(0, 4)}-${phone.substring(4, 8)}`;
        } else if (/^0[3589]00$/.test(phone.substring(0, 4))) {
            return `${phone.substring(0, 4)}-${phone.substring(4, 7)}-${phone.substring(7, 11)}`;
        } else if (/^[1-9][0-9][1-5][0-9]$/.test(phone.substring(0, 4))) {
            return `(${phone.substring(0, 2)}) ${phone.substring(2, 6)}-${phone.substring(6, 10)}`;
        }
        return phone;
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
    percentage(value: number, maximumFractionDigits: number = 2): string {
        return value.toLocaleString(this.locale, {
            style: 'percent',
            maximumFractionDigits: maximumFractionDigits,
        });
    }

    size(
        bytes: number,
        unitDisplay: 'short' | 'long' | 'narrow' | undefined = 'short',
        maximumFractionDigits: number = 2,
    ): string {
        const units = [
            'byte',
            'kilobyte',
            'megabyte',
            'gigabyte',
            'terabyte',
            'petabyte',
            'exabyte',
            'zettabyte',
            'yottabyte',
        ];
        let i = 0;

        while (bytes >= 1024 && i < units.length - 1) {
            bytes /= 1024;
            i++;
        }

        return bytes.toLocaleString(this.locale, {
            style: 'unit',
            unit: units[i],
            unitDisplay: unitDisplay,
            maximumFractionDigits: maximumFractionDigits,
        });
    }
}
