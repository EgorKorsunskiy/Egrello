const existedIds = [];

const generateId = () => Math.floor(((Math.random() * Math.random() * Math.pow(10, Math.random())) * (Math.random() * 100)));

export const UID = () => {
    const generatedId = generateId();

    if(generatedId in existedIds){
        UID()
    }
    else{
        existedIds.push(generatedId);
        return generatedId;
    }

}