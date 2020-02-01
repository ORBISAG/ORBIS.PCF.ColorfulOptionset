import * as React from 'react';
import {FontWeights, ITheme, createTheme, disableBodyScroll} from "office-ui-fabric-react/lib/index";
import {Dropdown, IDropdown, IDropdownOption,  IDropdownProps, IDropdownStyles, IDropdownStyleProps} from 'office-ui-fabric-react/lib/Dropdown';
import {initializeIcons} from "office-ui-fabric-react/lib/Icons"
import { Icon} from "office-ui-fabric-react/lib/Icon";
import {ISelectableOption} from "office-ui-fabric-react/lib/SelectableOption";
import { IComponentStyles } from 'office-ui-fabric-react/lib/Foundation';



/*
  //IComboBoxOption[]
  export interface IColorIndexer {
      [index : number] : string;      
  }*/

initializeIcons();
/*
const styles: Partial<IDropdownStyles> = {
  title: [{
    borderColor: "transparent",                
    outline: "none"            
  }], 
  caretDown :[{
    color: "transparent"
  }] 
};
*/

const myTheme = createTheme({
 // disableGlobalClassNames: true,
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
    white: '#ffffff'                  
  }});

interface IColorfulOptionsetProperties {
    options: IDropdownOption[];
    selectedKey: number | null;          
    onChange: (value: number|null) => void
    isDisabled : boolean;
}  

//export default class ColorfulOptionsetControl extends React.Component<IColorfulOptionsetProperties, {}> {            
export const ColorfulOptionsetControl = ({options, selectedKey, onChange, isDisabled}:IColorfulOptionsetProperties): JSX.Element =>{
  console.log(selectedKey);
            
    const _onSelectedChanged = (option?: IDropdownOption) => {       
      const val = (option?.key == null || option?.key===-1) ? null : option?.key as number;
      onChange(val);      
    }

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

      const colorFocus = "#a9a9a9";
   
      const myStyles = (props: IDropdownStyleProps):Partial<IDropdownStyles> => ({        
        title: [{
          fontWeight: props.isOpen===true ? "400" : "bold",
          borderColor: props.isOpen===true ? colorFocus : "transparent",
          backgroundColor : props.disabled === true ? "lightgray" : "transparent",
          outline: "none",
          selectors: {
            ':focus:hover': {
              borderColor: "blue"
            }
          }
        }],               
        caretDown :[{
          color: props.isOpen===true? colorFocus : "transparent",
          selectors: {
            ':focus:hover': {
              borderColor: "blue"
            }
          }
        }],
        caretDownWrapper: [{
          borderLeftColor: props.isOpen===true? colorFocus : "transparent"
        }]
      });
      
     
    return (
        <Dropdown        
            placeHolder="---"
            options={options}
            //defaultValue={value || -1}
            selectedKey={selectedKey || -1}  
            onRenderTitle = {_onRenderTitle}            
            onRenderOption = {_onRenderOption}            
            onChanged={_onSelectedChanged}                         
            disabled={isDisabled} 
            className="ComboBox"                        
             styles = {myStyles}
            theme = {myTheme}           
        />
    );

}
   
   




