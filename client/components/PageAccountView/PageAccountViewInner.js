// libs
import React, {PropTypes} from "react";
import QueueAnim from 'rc-queue-anim';
import DocumentTitle from "react-document-title";
import styles from "./PageAccountViewInner.scss";
import { Link } from "react-router-dom";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import IconButton from 'material-ui/IconButton/IconButton';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
// import ActionDelete className="action-icon" from 'material-ui/svg-icons/communication/call';
import ActionCached from 'material-ui/svg-icons/action/cached';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
// import {indigo500} from 'material-ui/styles/colors';
import {grey400, grey600, darkBlack, lightBlack} from 'material-ui/styles/colors';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';

const MyAccounts = ({ onSelectionSubmit, onSelectionChange, onDeleteClick, onRefreshClick, selectedProvider, providerList, userProviderList }) => (
	<article className="article">
		<h2 className="article-title">Wallets</h2>
		<div className="row">
			<div className="col-lg-8 ">
				<div>
					<div className="box box-default table-box table-responsive mdl-shadow--2dp">
						<table className="mdl-data-table">
							<thead className="tbl-header">
								<tr>
									<th className="mdl-data-table__cell--non-numeric">Wallet</th>
									<th className="mdl-data-table__cell--non-numeric">Provider</th>
									<th>Balance</th>
									<th></th>
								</tr>
							</thead>
							<tbody className="tbl-body">
								<Choose>
									<When condition={ userProviderList && userProviderList[0] && userProviderList[0].UserWallets.length > 0 }>
										{console.log('PROVIDER LIST FOUND')}
										{userProviderList.map(userProviderListItem =>
											userProviderListItem.UserWallets.map(userWallet => 
												<tr key={userWallet.id}>
													<td className="mdl-data-table__cell--non-numeric">
														{userWallet.walletName}<br/>
														<span className="secondary-text">{userWallet.walletId}</span>
													</td>
													<td className="mdl-data-table__cell--non-numeric">{userProviderListItem.provider.displayName}</td>
													<td>{userWallet.balance}</td>
													<td>
														<a href="#" onClick={ onRefreshClick.bind(this, userProviderListItem.provider.id) } className="action-icon"><ActionCached /></a>
														<a href="#" onClick={ onDeleteClick.bind(this, userWallet.id) } className="action-icon"><ActionDelete/></a>
													</td>
												</tr>
											)
										)}
									</When>
									<Otherwise>
										<tr>
											<td colSpan="4" className="text-center">Wallets from connected accounts will show up here.</td>
										</tr>
									</Otherwise>
								</Choose>
							</tbody>
						</table>
					</div>
				</div>

				<div>
					<div className="box box-default">
						<div className="box-header box-header-primary">Associated Addresses</div>
						<div className="box-body">
							<p>These addresses were found in the transaction histories of your connected wallets.</p>
							<div className="box box-default table-box table-responsive mdl-shadow--2dp">
								<table className="mdl-data-table">
									<thead className="tbl-header">
										<tr>
											<th className="mdl-data-table__cell--non-numeric">Nickname</th>
											<th className="mdl-data-table__cell--non-numeric">Address</th>
											<th></th>
										</tr>
									</thead>
									<tbody className="tbl-body">
										<tr>
											<td className="mdl-data-table__cell--non-numeric">145J2KWhnYgMpkMUGBrXfm6E9pFmrn5at3</td>
											<td className="mdl-data-table__cell--non-numeric">Some BTC</td>
											<td>
												<a href="#" className="action-icon"><EditorModeEdit color={grey400}/></a>
												<a href="#" className="action-icon"><ActionDelete color={grey400}/></a>
											</td>
										</tr>
										<tr>
											<td className="mdl-data-table__cell--non-numeric">1JeK3CgCuPHVw9S5niUj4D7HFJ5bXc1JYR</td>
											<td className="mdl-data-table__cell--non-numeric">BTC-Income</td>
											<td>
												<a href="#" className="action-icon"><EditorModeEdit color={grey400}/></a>
												<a href="#" className="action-icon"><ActionDelete color={grey400}/></a>
											</td>
										</tr>
										<tr>
											<td className="mdl-data-table__cell--non-numeric">3BUp6EH8Vs2BAYsPQCLX8hdo8oyFpM28R9</td>
											<td className="mdl-data-table__cell--non-numeric">ETH-Alice</td>
											<td>
												<a href="#" className="action-icon"><EditorModeEdit color={grey400}/></a>
												<a href="#" className="action-icon"><ActionDelete color={grey400}/></a>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="col-lg-4">
				<div className="box box-default">
					<div className="box-header box-header-primary">Add Account</div>
					<div className="box-body">
						<p>Connect to an online account by selecting a service provider from the dropdown.</p>
						<form role="form">
							<div className="form-group">
								<SelectField
									fullWidth
									className="primary-select-field"
									floatingLabelText="Select a provider"
									onChange={ onSelectionChange }
									value={ selectedProvider }>
									{providerList.map(provider => 
										<MenuItem key={ provider.id } value={ provider.id } primaryText={ provider.displayName } />
									)}
								</SelectField>
							</div>
							<RaisedButton label="Connect" onClick={ onSelectionSubmit } primary />
							<div className="divider" />
						</form>
					</div>
				</div>
			</div>
		</div>
	</article>
)

const MyAddresses = ({ userAddressesList, onAddAddressesClick, newAddressesValue, updateAddressesValue }) => (
	<article className="article">
		<h2 className="article-title">Addresses</h2>
		
		<div className="row">
			<div className="col-lg-8">
				<div className="box box-default">
					<div className="box-header box-header-primary">My Addresses</div>
					<div className="box-body">
						<p>These are the addresses you added manually.</p>
						<div className="box box-default table-box table-responsive mdl-shadow--2dp">
							<table className="mdl-data-table">
								<thead className="tbl-header">
									<tr>
										<th className="mdl-data-table__cell--non-numeric">Nickname</th>
										<th className="mdl-data-table__cell--non-numeric">Address</th>
										<th>Balance</th>
										<th></th>
									</tr>
								</thead>
								<tbody className="tbl-body">
									<Choose>
										<When condition={ userAddressesList && userAddressesList.length > 0 }>
											{ userAddressesList.map(userAddressesListItem =>
												<tr>
													<td className="mdl-data-table__cell--non-numeric">{userAddressesListItem.nickName}</td>
													<td className="mdl-data-table__cell--non-numeric">{userAddressesListItem.address}</td>
													<td>{userAddressesListItem.balance} {userAddressesListItem}</td>
													<td>
														<a href="#" className="action-icon"><EditorModeEdit color={grey400}/></a>
														<a href="#" className="action-icon"><ActionDelete color={grey400}/></a>
													</td>
												</tr>	
											)}
										</When>
										<Otherwise>
											<tr>
												<td colSpan="4" className="text-center">BTC addresses you add manually will show up here.</td>
											</tr>
										</Otherwise>
									</Choose>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			<div className="col-lg-4">
				<div className="box box-default">
					<div className="box-header box-header-primary">Add Addresses</div>
					<div className="box-body">
						<p>Enter one BTC address per line. Other addresses that are yours based on Wisdom's analysis of the blockchain will be automatically added for you.</p>
						<form className="form-inline" role="form">
							<TextField
								hintText="Enter one address per line"
								multiLine
								rows={1}
								rowsMax={10}
								fullWidth
								onChange={ updateAddressesValue }
								value={ newAddressesValue }
							/>
							<RaisedButton label="Add Addresses" onClick={ onAddAddressesClick } primary />
						</form>
					</div>
				</div>
			</div>
		</div>
	</article>
)

const PageAccountViewInner = (props) => {
	const { onSelectionSubmit, onSelectionChange, onDeleteClick, onRefreshClick, 
					selectedProvider, providerList, userProviderList, userAddressesList, onAddAddressesClick, newAddressesValue, updateAddressesValue } = props;
  return (
    <section className="container-fluid chapter">
			<DocumentTitle title="Accounts" />
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1"><MyAccounts 
					onSelectionSubmit={ onSelectionSubmit } 
					onSelectionChange={ onSelectionChange } 
					onDeleteClick={ onDeleteClick } 
					onRefreshClick={ onRefreshClick } 
					selectedProvider={ selectedProvider } 
					providerList={ providerList } 
					userProviderList={ userProviderList } />
				</div>
        <div key="2"><MyAddresses 
					userAddressesList={ userAddressesList }
					onAddAddressesClick={ onAddAddressesClick }
					newAddressesValue={ newAddressesValue }
					updateAddressesValue={ updateAddressesValue }/>
				</div>
      </QueueAnim>
    </section>
  )
}

PageAccountViewInner.propTypes={
  providerList: PropTypes.array,
	userProviderList: PropTypes.array,
	userAddressesList: PropTypes.array,
	onSelectionChange: React.PropTypes.func.isRequired,
	onSelectionSubmit: React.PropTypes.func.isRequired,
	updateAddressesValue: React.PropTypes.func.isRequired
};

export default PageAccountViewInner;
