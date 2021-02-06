
const prefix = Date.now() + "_" + performance.now() + "_" + Math.random();
let index = 0;

const generateId = () => prefix + "_" + ++index;

export const UID = () => {
    return generateId();
}

export const swap = (arr, i, j) => {
    const temp = arr[i];

    arr[i] = arr[j];
    arr[j] = temp;
}