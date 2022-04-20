import * as React from 'react';

import {Dropdown, IDropdownOption} from "@fluentui/react/lib/Dropdown"
import {initializeIcons} from "@fluentui/react/lib/Icons"
import { Icon} from "@fluentui/react/lib/Icon";
import {ISelectableOption} from "@fluentui/react/lib/SelectableOption";
import {dropdownStyles, myTheme} from "./DropdownStyles";

export interface ISetupSchemaValue{
  icon ?: string;
  color ?: string;
} 
export interface ISetupSchema{
  [value: string] : ISetupSchemaValue;           
}

export interface IConfig{
  jsonConfig: ISetupSchema | undefined;
  defaultIconName : string;
}

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
    defaultValue : number | undefined;
    config: IConfig;
}  







//export default class ColorfulOptionsetControl extends React.Component<IColorfulOptionsetProperties, {}> {            
export const ColorfulOptionsetControl = ({options, selectedKey, onChange, isDisabled, defaultValue, config}:IColorfulOptionsetProperties): JSX.Element =>{
  
  const _onSelectedChanged = (event: any, option?: IDropdownOption) => {       
    const val = (option?.key == null || option?.key===-1) ? null : option?.key as number;   
    onChange(val);           
  }

  const _renderOption =(option: ISelectableOption | undefined, className ?:string) : JSX.Element => {
    const icon = ((config.jsonConfig && option?.key) ? config.jsonConfig[option?.key]?.icon : config.defaultIconName)  ?? config.defaultIconName;
    const defaultColor = option?.data?.color || "#ffffff";
    const color = ((config.jsonConfig && option?.key) ? config.jsonConfig[option?.key]?.color : defaultColor)  ?? defaultColor;
    return (
      <div className={className}>
          <Icon className="colorIcon" style={{color: color, marginRight: "8px"}} iconName={icon} aria-hidden="true" />          
        <span>{option?.text || ""}</span>
      </div>
    );  
  }

  const _onRenderOption = (option: ISelectableOption | undefined): JSX.Element => {
    return _renderOption(option, "ORBIS_ColorfulOptionset_item")
  };

const _onRenderTitle = (options: IDropdownOption[] | undefined): JSX.Element => {
    const option = (options || [])[0];
    return _renderOption(option, "option");
        
  };
     
    return (
        <Dropdown        
            placeHolder="---"
            options={options}
            defaultValue={defaultValue || -1}
            selectedKey={selectedKey}  
            onRenderTitle = {_onRenderTitle}            
            onRenderOption = {_onRenderOption}            
            onChange={_onSelectedChanged}                         
            disabled={isDisabled} 
            className="ComboBox"                        
             styles = {dropdownStyles}
            theme = {myTheme}           
        />
    );

}
   
   




