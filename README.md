# ORBIS.PCF.ColorfulOptionset
This control is an optionset control for model driven apps (Dynamics 365) reflecting the options color provided in the customizing. The control is build using [office-ui-fabric-react](https://github.com/OfficeDev/office-ui-fabric-react). 

Note: Right now it only support single optionset controls.

## Control Preview
![preview](./readmeContent/ColorfulOptionset.gif)
On the left side you see two instances of the control (the second is disabled). On the right side you can see the standard OptionSet control.

## Install

1. Download the latest version of the solution from [releases](/releases).
2. Import the solution to your Dynamics365CE instance

## Registering the control

After you install the control, you should be able to select the control from the list of available controls for an optionset field.
![customizing](./readmeContent/Customizing_AddControl.png)
![customizing](./readmeContent/CustomizingOnTheForm.png)


## Customizing the colors

Right now only the classic UI allows you to customize the colors and the control on the form.
This control is designed for Optionset attribute types. In order to define the colors, navigate to attribute (Field) customization, select each option and set the color code.
![colors](./readmeContent/CustomizingColors.png)


## License

[MIT](./LICENSE)
