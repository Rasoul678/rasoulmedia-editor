import { useTypedSelector } from "./useTypedSelector";

export const useCumulativeCode = (cellID: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    const showFunc = `
        import _React from 'react';
        import _ReactDOM from 'react-dom';

        var show = (value) => {
        const rootElement = document.querySelector('#root');
        const root = _ReactDOM.createRoot(rootElement);

        if(typeof value === 'object'){
            if(value.$$typeof && value.props){
            root.render(value);
            }else{
            rootElement.innerHTML = JSON.stringify(value);
            }
        }else{
            rootElement.innerHTML = value;
        }

        }
    `;

    const showFuncNoop = "var show = () => {}";

    const cumulativeCode = [];

    for (let c of orderedCells) {
      if (c.type === "code") {
        if (c.id === cellID) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFuncNoop);
        }

        cumulativeCode.push(c.content);
      }

      if (c.id === cellID) break;
    }

    return cumulativeCode;
  }).join("\n");
};
