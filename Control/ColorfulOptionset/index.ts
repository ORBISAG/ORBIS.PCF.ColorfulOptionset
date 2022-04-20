import {IInputs, IOutputs} from "./generated/ManifestTypes";
import { IDropdownOption } from  "@fluentui/react/lib/Dropdown";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ColorfulOptionsetControl, IConfig, ISetupSchema} from "./ColorfulOptionsetControl";



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



export class ColorfulOptionset implements ComponentFramework.ReactControl<IInputs, IOutputs> {

	private allOptions : ComponentFramework.PropertyHelper.OptionMetadata[];
	private dropdownOptions : IDropdownOption[];
	private defaultValue : number | undefined;
	private isDisabled : boolean;

	private container: HTMLDivElement;
	private currentValue: number | null;
	private notifyOutputChanged: () => void;

	private config : IConfig | undefined;

	
	constructor()
	{

	}


	private parseIconConfig(defaultIcon : string,  iconConfig ?: string): IConfig{
		const isJSON = iconConfig && iconConfig.includes("{");
		this.config = { 
			jsonConfig : isJSON === true ? JSON.parse(iconConfig as string) as ISetupSchema : undefined,
			defaultIconName : (!isJSON ? iconConfig : defaultIcon) ?? defaultIcon		
		}
		return this.config;
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
		
		console.log("using virtual control in ColorfulOptionset");				
		this.defaultValue = context.parameters.optionsInput.attributes?.DefaultValue;

		this.container = container;
		this.notifyOutputChanged = notifyOutputChanged;
		
	}

	private renderControl(context: ComponentFramework.Context<IInputs>) : React.ReactElement {

		this.allOptions = [{Label: "--Select--", Value: -1, Color: "transparent"}, ...context.parameters.optionsInput.attributes!.Options];	
		this.dropdownOptions = this.allOptions
			.map((option : ComponentFramework.PropertyHelper.OptionMetadata ) =>  ({key: option.Value, text : option.Label, data: {color: option.Color}}) )
		if(context.parameters.sortBy?.raw==="TEXT"){
			this.dropdownOptions = this.dropdownOptions.sort((a, b) =>a.text.localeCompare(b.text));
		}			

		this.isDisabled = context.mode.isControlDisabled;
		this.currentValue = context.parameters.optionsInput.raw;	
		let params = {
			options: this.dropdownOptions,
			selectedKey: this.currentValue, 			
			onChange: (newValue: number |null) => {
				this.currentValue = newValue;
				this.notifyOutputChanged();
			}, 
			isDisabled : this.isDisabled, 
			defaultValue : this.defaultValue, 
			config: this.config ?? this.parseIconConfig("CircleShapeSolid",  context.parameters.icon?.raw ?? undefined)		
		};			
		return React.createElement(ColorfulOptionsetControl, params );
	
	}
	

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement
	{
		return this.renderControl(context);
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
	}	
}