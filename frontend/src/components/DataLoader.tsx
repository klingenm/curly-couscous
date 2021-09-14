import * as React from "react";
import { FunctionComponent } from "react";

export const DataLoader: FunctionComponent = () => {
    const [shouldLoad, setShouldLoad] = React.useState(false);
    const [data, setData] = React.useState('');
    React.useEffect(() => {
        if (shouldLoad) {
            fetch('/api/getdata').then((response) => response.text()).then(setData);
        }
    }, [shouldLoad]);

    return <>
        <pre>{data}</pre>
        <button onClick={ () => setShouldLoad(true) }>load data</button>
    </>
}