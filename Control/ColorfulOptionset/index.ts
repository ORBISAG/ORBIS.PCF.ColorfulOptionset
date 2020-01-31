import {IInputs, IOutputs} from "./generated/ManifestTypes";
import { IDropdownOption, IDropdown } from "office-ui-fabric-react";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ColorfulOptionsetControl} from "./ColorfulOptionsetControl";



const DEFAULT_OPTIONS : ComponentFramework.PropertyHelper.OptionMetadata[] = [{
	Value : 1,
	Label : "Accounting",
	Color : "#ff0000"
},
{
	Value : 2,
	Label : "Development, this is a pretty long line",
	Color : "#00ff00"
},
{
	Value : 3,
	Label : "Management, and this is an even longer line",
	Color : "#0000ff"
}, 
{
	Value : 4,
	Label : "Option 4",
	Color : "#00ffee"
},
{
	Value : 5,
	Label : "Option 5",
	Color : "#eeccaa"
}
];

export class ColorfulOptionset implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private allOptions : ComponentFramework.PropertyHelper.OptionMetadata[];
	private dropdownOptions : IDropdownOption[];
	private defaultValue : number | undefined;
	private isDisabled : boolean;

	private container: HTMLDivElement;
	private currentValue: number | null;
	private notifyOutputChanged: () => void;

	
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{		
		
		
		let opts =  context.parameters.optionsInput.attributes!.Options;
		//todo
		if(opts?.length === 3){
			opts = DEFAULT_OPTIONS;
		} 
		this.allOptions = [{Label: "--Select--", Value: -1, Color: "transparent"}, ...opts];
		this.dropdownOptions = this.allOptions.map((option : ComponentFramework.PropertyHelper.OptionMetadata ) =>  ({key: option.Value, text : option.Label, data: {color: option.Color}}) )
	
		this.container = container;
		this.notifyOutputChanged = notifyOutputChanged;

		this.renderControl(context);
	}

	private renderControl(context: ComponentFramework.Context<IInputs>) : void {
		const value = context.parameters.optionsInput.raw;
		let params = {
			options: this.dropdownOptions,
			selectedKey: value, 			
			onChange: (newValue: number |null) => {
				this.currentValue = newValue;
				this.notifyOutputChanged();
			}, 
			isDisabled : this.isDisabled			
		};
		//todo: defaultValue
		ReactDOM.render(React.createElement(ColorfulOptionsetControl, params ) , this.container);
	}
	

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		this.isDisabled = context.mode.isControlDisabled;
		this.defaultValue = context.parameters.optionsInput.attributes?.DefaultValue;

		this.renderControl(context);
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {
			optionsInput: this.currentValue == null ? undefined : this.currentValue
		};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		ReactDOM.unmountComponentAtNode(this.container);
	}
}