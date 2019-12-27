import * as React from 'react';
import {ComboBox, IComboBox, IComboBoxOption, initializeIcons} from 'office-ui-fabric-react';



  //IComboBoxOption[]
  export interface IColorIndexer {
      [index : number] : string;      
  }

interface IColorfulOptionsetProperties {
    options: ComponentFramework.PropertyHelper.OptionMetadata[];
    selectedKey: number | null;   
    allColors : IColorIndexer;
    onSelectedChanged: (event: React.FormEvent<IComboBox>, option?:  IComboBoxOption | undefined, index?: number | undefined, value?: string | undefined) => void;
}

initializeIcons();

export default class ColorfulOptionsetControl extends React.Component<IColorfulOptionsetProperties, {}> {        
    private _onRenderOption = (item: IComboBoxOption | undefined) : JSX.Element => {  
        if(item==null){
            return <span></span>;
        }          
        const key = +item.key; //+ converts to number
        const color = this.props.allColors[key]|| "red";            
        return <span><i style={{color: color, marginRight: "2px", float: "left"}} className="fa fa-square fa-2x" aria-hidden="true"></i>{item?.text}</span>
    }
  
    render() {       
        return (
            <ComboBox
               // placeHolder="--Select--"
                options={this.props.options.map((option) => ({key : option.Value, text : option.Label}))}
                selectedKey={this.props.selectedKey}               
                onChange={this.props.onSelectedChanged}
                onRenderOption = {this._onRenderOption}
                autoComplete = "on"
                allowFreeform = {false}
                // styles = {{input: {color: "red"}, root: {color: "red"}}}
                useComboBoxAsMenuWidth={true}
                styles={{						  
                    optionsContainer : {
                        maxHeight: '300px'
                    }
                }}
            />
        );
    }   
}

