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
  palette: {
    themePrimary: '#ffffff',
    themeLighterAlt: '#767676',
    themeLighter: '#a6a6a6',
    themeLight: '#c8c8c8',
    themeTertiary: '#d0d0d0',
    themeSecondary: '#dadada',
    themeDarkAlt: '#eaeaea',
    themeDark: '#f4f4f4',
    themeDarker: '#f8f8f8',
    neutralLighterAlt: '#faf9f8',
    neutralLighter: '#f3f2f1',
    neutralLight: '#edebe9',
    neutralQuaternaryAlt: '#e1dfdd',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c6c4',
    neutralTertiary: '#595959',
    neutralSecondary: '#373737',
    neutralPrimaryAlt: '#2f2f2f',
    neutralPrimary: '#000000',
    neutralDark: '#151515',
    black: '#0b0b0b',
    white: '#ffffff',
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
          color: "black",
          display: "block",
          fontWeight: props.isOpen===true ? "400" : "600",
          fontStretch: "normal",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: props.isOpen===true ? "black" : "transparent",         
          backgroundColor : "transparent",             
          outline: "none",     
          outlineColor: "transparent",
          outlineOffset: "0",
          boxSizing: "border-box",             
          height: "33px",
          width: "100%",                             
          selectors: {
            ':hover': {
              borderColor: "black",
              borderWidth:"1px",
              fontWeight : props.disabled === true ? "600" : "400", 
              backgroundColor : props.disabled === true ? "#E2E2E2" : "transparent",
              boxShadow: "none"
            }                
          }
        }],   
        dropdown: [{
          outline: "none",
          border: "1px solid transparent",
          outlineColor: "transparent",
          outlineOffset: "0",
          boxShadow: "none",
          selectors:{
            ":focus:after": {
              outline: "none",
              border: "1px solid black",
              outlineColor: "transparent",
              boxShadow: "none"
            }/*,
            ":hover": {
              border: "1px solid transparent",
              outline : "none",
              outlineColor: "transparent",
              boxShadow: "none"
            },
            ':after':{
              outline: "none",
              border: "1px solid transparent",
              outlineColor: "transparent",
              outlineOffset: "0",
              boxShadow: "none"
            } */
          }

        }]/*,
        dropdownItemSelected: [{
          outline: "none",
          border: "1px solid transparent",
          outlineColor: "transparent",
          selectors:{
            ":focus": {
              outline: "none",
              border: "1px solid transparent",
              outlineColor: "transparent"
            },
            ":hover": {
              border: "1px solid transparent",
              outline : "none",
              outlineColor: "transparent"
            },
            ":active": {
              border: "1px solid transparent",
              outline : "none",
              outlineColor: "transparent"
            }
          }

        }],            
        root: [{
          outline: "none",
          border: "1px solid transparent",
          outlineColor: "transparent",
          selectors:{
            ":focus": {
              outline: "none",
              border: "1px solid transparent",
              outlineColor: "transparent"
            },
            ":hover": {
              border: "1px solid transparent",
              outline : "none",
              outlineColor: "transparent"
            }, 
            ":active": {
              border: "1px solid transparent",
              outline : "none",
              outlineColor: "transparent"
            }

          }

        }]*/,   
        caretDown :[{
          color: props.isOpen===true? colorFocus : "transparent"        
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
            //theme = {myTheme}           
        />
    );

}
   
   




