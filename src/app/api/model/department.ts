interface Department {
    male: number;
    female: number;
    ageRange: string;
    hair: {
        [color: string]: number;
    };
    addressUser: {
        [fullName: string]: string;
    };
}

export default Department;