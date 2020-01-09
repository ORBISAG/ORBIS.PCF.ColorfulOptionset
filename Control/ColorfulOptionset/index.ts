import {IInputs, IOutputs} from "./generated/ManifestTypes";
import { IDropdownOption, IDropdown } from "office-ui-fabric-react";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ColorfulOptionsetControl from "./ColorfulOptionsetControl";



const DEFAULT_OPTIONS : ComponentFramework.PropertyHelper.OptionMetadata[] = [{
	Value : 1,
	Label : "Accounting",
	Color : "#ff0000"
},
{
	Value : 2,
	Label : "Development",
	Color : "#00ff00"
},
{
	Value : 3,
	Label : "Management",
	Color : "#0000ff"
}
];

export class ColorfulOptionset implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private allOptions : ComponentFramework.PropertyHelper.OptionMetadata[];
	private dropdownOptions : IDropdownOption[];
	private defaultValue : number | undefined;

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
		// Add control initialization code
		this.allOptions = context.parameters.myInput.attributes!.Options;
		if(this.allOptions.length === 3){
			this.allOptions = DEFAULT_OPTIONS;
		} 
		this.dropdownOptions = this.allOptions.map((option : ComponentFramework.PropertyHelper.OptionMetadata ) =>  ({key: option.Value, text : option.Label, data: {color: option.Color}}) )
		this.defaultValue = context.parameters.myInput.attributes?.DefaultValue;

		this.container = container;
		this.notifyOutputChanged = notifyOutputChanged;

		this.renderControl(context);
	}

	private renderControl(context: ComponentFramework.Context<IInputs>) {
		const currentValue = context.parameters.myInput.raw;
	
		let p = {
			options: this.dropdownOptions,
			selectedKey: currentValue, 			
			onSelectedChanged: (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
				this.currentValue = option == null ? null : <number>option.key;
				this.notifyOutputChanged();
			}			
		};

		ReactDOM.render(React.createElement(ColorfulOptionsetControl, p), this.container);
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		this.renderControl(context);
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {
			myInput: this.currentValue == null ? undefined : this.currentValue
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