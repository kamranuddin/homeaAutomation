import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField'
import moment from 'moment'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

const AddPalaceInner = (props) =>{
    const {handleCloseDialog,handleCancelDialog,open,isSubmit,handleHomeName,handleFloorName,handlePalaceType,handlePalaceName,palaceName} = props;
    const AddPalaceActions = [
        <FlatButton
            label="Cancel"
            primary={false}
            onClick={handleCancelDialog}
        />,
        <FlatButton
            label="Add"
            primary={true}
            onClick={handleCloseDialog}
        />,
    ];
    return(
        <div>
            <Dialog
                title="Add Palace"
                actions={AddPalaceActions}
                modal={false}
                open={open}
                onRequestClose={handleCloseDialog}
            >

                <div className="row">
                    <div className="col-sm-2">
                        <Subheader style={{marginTop : 17,paddingLeft : 0}}>Home Name</Subheader>
                        <Divider />
                    </div>
                    <div className="col-sm-4">
                        <DropDownMenu value={1}  style={{marginTop : 15}} onChange={handleHomeName} >
                            <MenuItem value={1} primaryText="Kamran Home" />
                            <MenuItem value={2} primaryText="Irfan Home" />
                            <MenuItem value={3} primaryText="My New Home" />
                            <MenuItem value={4} primaryText="My Another Home" />
                        </DropDownMenu>
                    </div>
                    <div className="col-sm-2">
                        <Subheader style={{marginTop : 16,paddingLeft : 0}}>Floor Name</Subheader>
                        <Divider />
                    </div>
                    <div className="col-sm-4">
                        <DropDownMenu value={1}  style={{marginTop : 15}} onChange={handleFloorName} >
                            <MenuItem value={1} primaryText="Ground Floor" />
                            <MenuItem value={2} primaryText="First Floor" />
                            <MenuItem value={3} primaryText="Second Floor" />
                        </DropDownMenu>
                    </div>

                </div>

                <div className="row">
                    <div className="col-sm-2">
                        <Subheader style={{marginTop : 16,paddingLeft : 0}}>Palace Type</Subheader>
                        <Divider />
                    </div>
                    <div className="col-sm-4">
                        <DropDownMenu value={1}  style={{marginTop : 15}} onChange={handlePalaceType} >
                            <MenuItem value={1} primaryText="Room" />
                            <MenuItem value={2} primaryText="Hall" />
                            <MenuItem value={3} primaryText="Garden" />
                        </DropDownMenu>
                    </div>
                    <div className="col-sm-6">
                        <TextField
                            id="floorName"
                            floatingLabelText="Palace Name"
                            floatingLabelFixed
                            fullWidth
                            onChange={handlePalaceName}
                            value = { palaceName}
                            errorText={isSubmit && palaceName == "" && "Please add palace name"}
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default AddPalaceInner