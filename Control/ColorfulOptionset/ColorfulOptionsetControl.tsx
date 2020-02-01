import * as React from 'react';

import {Dropdown, IDropdownOption} from 'office-ui-fabric-react/lib/Dropdown';
import {initializeIcons} from "office-ui-fabric-react/lib/Icons"
import { Icon} from "office-ui-fabric-react/lib/Icon";
import {ISelectableOption} from "office-ui-fabric-react/lib/SelectableOption";
import {dropdownStyles, myTheme} from "./DropdownStyles";



/*
  //IComboBoxOption[]
  export interface IColorIndexer {
      [index : number] : string;      
  }*/

initializeIcons();


  



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
             styles = {dropdownStyles}
            theme = {myTheme}           
        />
    );

}
   
   




