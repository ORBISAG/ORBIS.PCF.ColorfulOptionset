import * as React from 'react';
import {Dropdown, IDropdown, IDropdownOption, initializeIcons, ISelectableOption, Icon} from 'office-ui-fabric-react';


/*
  //IComboBoxOption[]
  export interface IColorIndexer {
      [index : number] : string;      
  }*/

interface IColorfulOptionsetProperties {
    options: IDropdownOption[];
    selectedKey: number | null;      
    onSelectedChanged: (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => void;
    isDisabled : boolean;
}

initializeIcons();

export default class ColorfulOptionsetControl extends React.Component<IColorfulOptionsetProperties, {}> {        
   /* private _onRenderOption = (item: IComboBoxOption | undefined) : JSX.Element => {  
        if(item==null){
            return <span></span>;
        }          
        const key = +item.key; //+ converts to number
        const color = this.props.allColors[key]|| "red";            
        return <span><i style={{color: color, marginRight: "2px", float: "left"}} className="fa fa-square fa-2x" aria-hidden="true"></i>{item?.text}</span>
    }*/
    private _onRenderOption = (option: ISelectableOption | undefined): JSX.Element => {
        return (
            <div className="option">          
                <Icon style={{color: option?.data?.color || "#ffffff"}} iconName="CircleShapeSolid" aria-hidden="true" />          
              <span>{option?.text || ""}</span>
            </div>
          );   
      };
    private _onRenderTitle = (options: IDropdownOption[] | undefined): JSX.Element => {
        const option = (options || [])[0];
        return this._onRenderOption(option);
            
      };
     
  
   
    render() {    
        debugger;   
        return (
            <Dropdown
               // placeHolder="--Select--"
                options={this.props.options}
                selectedKey={this.props.selectedKey}  
                onRenderTitle = {this._onRenderTitle}            
                onRenderOption = {this._onRenderOption}          
                onChange={this.props.onSelectedChanged}  
                className="ColorfulOptionset" 
                disabled={this.props.isDisabled}                       
            />
        );
    }   
}



