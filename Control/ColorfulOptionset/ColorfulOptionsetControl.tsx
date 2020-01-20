import * as React from 'react';
import {Dropdown, IDropdown, IDropdownOption,  IDropdownProps} from 'office-ui-fabric-react/lib/Dropdown';
import {initializeIcons} from "office-ui-fabric-react/lib/Icons"
import { Icon} from "office-ui-fabric-react/lib/Icon";
import {ISelectableOption} from "office-ui-fabric-react/lib/SelectableOption";


/*
  //IComboBoxOption[]
  export interface IColorIndexer {
      [index : number] : string;      
  }*/

initializeIcons();

const _onRenderOption = (option: ISelectableOption | undefined): JSX.Element => {
    return (
        <div className="option">          
            <Icon className="colorIcon" style={{color: option?.data?.color || "#ffffff", marginRight: "8px"}} iconName="CircleShapeSolid" aria-hidden="true" />          
          <span>{option?.text || ""}</span>
        </div>
      );   
  };

const _onRenderTitle = (options: IDropdownOption[] | undefined): JSX.Element => {
    const option = (options || [])[0];
    return _onRenderOption(option);
        
  };

//class reducer
type State = { className: string };

type Action<K, V = void> = V extends void ? 
  { type: K } : 
  { type: K } & V;

function defaultGuard<S>(state: S, a: never) { 
  return state; 
}

const classNameReducer = (
  s: State,
  a: Action<"CLICK" | "ENTER" | "LEAVE">
) => {
  switch (a.type) {
    case "CLICK":
        return { className : (s.className==="ComboBoxFocused") ? "ComboBoxClicked" : "ComboBoxFocused"};      
    case "ENTER":
      return { className : "ComboBoxFocused"}
    case "LEAVE":
      return { className : "ComboBox"}
    default:
      return {className : "ComboBox"};
  }
};


interface IColorfulOptionsetProperties {
    options: IDropdownOption[];
    selectedKey: number | null;          
    onChange: (value: number|null) => void
    isDisabled : boolean;
}  

//export default class ColorfulOptionsetControl extends React.Component<IColorfulOptionsetProperties, {}> {            
export const ColorfulOptionsetControl = ({options, selectedKey, onChange, isDisabled}:IColorfulOptionsetProperties): JSX.Element =>{
    const [value, setValue] = React.useState(selectedKey);
    const [className, dispatch] = React.useReducer(classNameReducer, {className: "ComboBox"});

    React.useEffect(() => {     
        onChange(value);      
    }, [value]);
      
    const _onSelectedChanged = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
        const newVal  = (option == null || option.key===-1) ? null : option.key as number;
        setValue(newVal);            
    }

   
  
   
     /*
    const _onRenderCaretDown = (props : IDropdownProps | undefined) : JSX.Element => {
          return <Icon iconName="ChevronDown" className={className.className}/>
      }  */
     
    return (
        <Dropdown
            placeHolder="---"
            options={options}
            selectedKey={value}  
            onRenderTitle = {_onRenderTitle}            
            onRenderOption = {_onRenderOption}          
            onChange={_onSelectedChanged}  
           // onRenderCaretDown={_onRenderCaretDown}
            //className="main" 
            disabled={isDisabled} 
            className={`ComboBoxMain ${className.className}`} 
            onClick={() => dispatch({type: "CLICK"})} 
            onMouseEnter={() => dispatch({type: "ENTER"})} 
            onMouseLeave={() => dispatch({type:"LEAVE"})}                  
            
        />
    );

}
   
   




