import * as React from 'react';
import {FontWeights, ITheme, createTheme, disableBodyScroll} from "office-ui-fabric-react/lib/index";
import {Dropdown, IDropdown, IDropdownOption,  IDropdownProps, IDropdownStyles} from 'office-ui-fabric-react/lib/Dropdown';
import {initializeIcons} from "office-ui-fabric-react/lib/Icons"
import { Icon} from "office-ui-fabric-react/lib/Icon";
import {ISelectableOption} from "office-ui-fabric-react/lib/SelectableOption";



/*
  //IComboBoxOption[]
  export interface IColorIndexer {
      [index : number] : string;      
  }*/

initializeIcons();

const _renderOption =(option: ISelectableOption | undefined, className ?:string) : JSX.Element => {
  return (
    <div className={className}>
        <Icon className="colorIcon" style={{color: option?.data?.color || "#ffffff", marginRight: "8px"}} iconName="CircleShapeSolid" aria-hidden="true" />          
      <span>{option?.text || ""}</span>
    </div>
  );  
}

const _onRenderOption = (option: ISelectableOption | undefined): JSX.Element => {
    return _renderOption(option, "item")
  };

const _onRenderTitle = (options: IDropdownOption[] | undefined): JSX.Element => {
    const option = (options || [])[0];
    return _renderOption(option, "option");
        
  };

//class reducer
type State = { className: string };

type Action<K, V = void> = V extends void ? 
  { type: K } : 
  { type: K } & V;

function defaultGuard<S>(state: S, a: never) { 
  return state; 
}

const reducer = (
  s: State,
  a: Action<"CLICK" | "ENTER" | "LEAVE">
) => {
  switch (a.type) {
    case "CLICK":
        return { 
            className : (s.className==="ComboBoxFocused") ? "ComboBoxClicked" : "ComboBoxFocused", 
            hasFocus : true
            };      
    case "ENTER":
      return { 
        className : "ComboBoxFocused", 
        hasFocus : true
    }
    case "LEAVE":
      return { 
          className : "ComboBox",
        hasFocus: false}
    default:
      return {className : "ComboBox", hasFocus : false};
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
   // const [className, dispatch] = React.useReducer(reducer, {className: "ComboBox", hasFocus: false});

    React.useEffect(() => {     
        onChange(value);      
    }, [value]);
      
    const _onSelectedChanged = (option?: IDropdownOption) => {
        const newVal  = (option == null || option.key===-1) ? null : option.key as number;
        setValue(newVal);            
    }

   
  
   
     /*
    const _onRenderCaretDown = (props : IDropdownProps | undefined) : JSX.Element => {
          return <Icon iconName="ChevronDown" className="myCaretDown"/>
      }  
*/
    
     /* const styles = {                      
        title: [{
            borderColor: "transparent",       
            fontWeight: FontWeights.bold,    
            appearance: "none",  
            "-webkit-appearance": "none",
            "-moz-appearance": "none",
            "-ms-appearance": "none",
            "-o-appearance": "none",
            outline: "none",               
            selectors: {
                ':hover': {
                  borderColor: "black",
                  outline: "none",
                  fontWeight: FontWeights.regular                 
                }, 
                ':focus': {
                  outline: "none",
                }                
              }
        }], 
        caretDown : [{
            color: "transparent",                       
            selectors: {
                ':hover': {
                  color: "black"
                }                 
            }}]
        
      };*/
      
      const styles: Partial<IDropdownStyles> = {
        title: [{
          borderColor: "transparent",                
          outline: "none"            
        }], 
        caretDown :[{
          color: "transparent"
        }] 
      };
     
      const myTheme = createTheme({
        disableGlobalClassNames: true,
        palette: {
          themePrimary: '#a9a9a9',
          themeLighterAlt: '#fcfcfc',
          themeLighter: '#f1f1f1',
          themeLight: '#e5e5e5',
          themeTertiary: '#cbcbcb',
          themeSecondary: '#b3b3b3',
          themeDarkAlt: '#979797',
          themeDark: '#808080',
          themeDarker: '#5e5e5e',
          neutralLighterAlt: '#faf9f8',
          neutralLighter: '#f3f2f1',
          neutralLight: '#edebe9',
          neutralQuaternaryAlt: '#e1dfdd',
          neutralQuaternary: '#d0d0d0',
          neutralTertiaryAlt: '#c8c6c4',
          neutralTertiary: '#a19f9d',
          neutralSecondary:  '#605e5c',
          neutralPrimaryAlt: '#3b3a39',
          neutralPrimary: '#323130',
          neutralDark: '#201f1e',
          black: '#000000',
          white: '#ffffff',
         
          
        }});
     
    return (
        <Dropdown
            placeHolder="---"
            options={options}
            selectedKey={value || -1}  
            onRenderTitle = {_onRenderTitle}            
            onRenderOption = {_onRenderOption}            
            onChanged={_onSelectedChanged}  
           // onRenderCaretDown={_onRenderCaretDown}
            //className="main" 
            disabled={isDisabled} 
            className="ComboBox"
           /* className={`ComboBoxMain ${className.className}`} 
            onClick={() => dispatch({type: "CLICK"})} 
            onMouseEnter={() => dispatch({type: "ENTER"})} 
            onMouseLeave={() => dispatch({type:"LEAVE"})}                              */
           styles={styles} 
           theme = {myTheme}
           
        />
    );

}
   
   




