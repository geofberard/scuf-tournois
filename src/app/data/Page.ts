import {OverridableComponent} from "@material-ui/core/OverridableComponent";
import {SvgIconTypeMap} from "@material-ui/core/SvgIcon/SvgIcon";

export interface Page {
    label: string,
    Icon: OverridableComponent<SvgIconTypeMap>
}