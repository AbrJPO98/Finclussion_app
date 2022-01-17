var justLog=true;

    export const setLogValue = (res) => {
        justLog=res;
    }

    export const getLogValue = () => {
        return justLog;
    }