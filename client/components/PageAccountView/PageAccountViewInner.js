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
import CircularProgress from 'material-ui/CircularProgress';
import IconButton from 'material-ui/IconButton/IconButton';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ActionCached from 'material-ui/svg-icons/action/cached';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import {grey400, grey600, darkBlack, lightBlack} from 'material-ui/styles/colors';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import NicknameDialog from './DialogModalView';
import findIndex from 'lodash/findIndex'


class MyAccounts extends React.Component {
	constructor(props) {
		super(props)
		if (props.userProviderList && props.userProviderList[0] && props.userProviderList[0].UserWallets.length > 0) {
			this.state = {
				selectedKey: props.userProviderList[0].UserWallets[0].id,
				selectedWallet: props.userProviderList[0].UserWallets[0]
			}
			console.log('SELECTED KEY: ', this.state.selectedKey, this.state.selectedWallet )
		}
	}

	handleRowClick = (value) => {
		console.log('Row clicked! ID is: ', value)
		this.setState({
			selectedKey: value,
			selectedWallet: this.props.userProviderList[0].UserWallets[findIndex(this.props.userProviderList[0].UserWallets, {id: value})]
		})
		console.log('SELECTED KEY: ', this.state.selectedKey, this.state.selectedWallet )

	}

	render() {
		const { onSelectionSubmit, onSelectionChange, onDeleteClick, onRefreshClick, selectedProvider, providerList, userProviderList, isRefreshUserWalletList } = this.props

		return (
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
											<When condition={ isRefreshUserWalletList }>
												<tr>
													<td colSpan="4" className="text-center">
														<CircularProgress size={30} thickness={3} />
													</td>
												</tr>
											</When>
											<Otherwise>
												<Choose>
													<When condition={ userProviderList && userProviderList[0] && userProviderList[0].UserWallets.length > 0 }>
														{userProviderList.map(userProviderListItem =>
															userProviderListItem.UserWallets.map(userWallet => 
																<tr key={userWallet.id} onClick={ this.handleRowClick.bind(this, userWallet.id) }>
																	<td className="mdl-data-table__cell--non-numeric">
																		{userWallet.walletName}<br/>
																		<span className="secondary-text">{userWallet.walletId}</span>
																	</td>
																	<td className="mdl-data-table__cell--non-numeric">{userProviderListItem.provider.displayName}</td>
																	<td>{userWallet.balance} {userWallet.currency}</td>
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
											</Otherwise>
										</Choose>
									</tbody>
								</table>
							</div>
						</div>

						<div>
							{console.log('userProviderList: ', userProviderList)}
							<div className="box box-default">
								<div className="box-header box-header-primary">{'Associated Addresses of ' + this.state.selectedWallet.walletName}</div>
								<div className="box-body">
									<p>These addresses were found in the transaction histories of your connected wallets.</p>
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
													<When condition={ this.state.selectedWallet.Transactions &&  this.state.selectedWallet.Transactions.length > 0}>
														{this.state.selectedWallet.Transactions.map(transaction =>
															<tr key={transaction.id}>
																<td className="mdl-data-table__cell--non-numeric">Sample Nickname</td>
																<td className="mdl-data-table__cell--non-numeric">{transaction.destination}</td>
																<td>{transaction.amount} {transaction.asset}</td>
																<td>
																	<a href="#" className="action-icon"><EditorModeEdit /></a>
																</td>
															</tr>
														)}
													</When>
													<Otherwise>
														<tr>
															<td colSpan="4" className="text-center">No associated addresses found.</td>
														</tr>
													</Otherwise>
												</Choose>
												{/*<tr onClick={ this.handleRowClick.bind(this, 2) }>
													<td className="mdl-data-table__cell--non-numeric">145J2KWhnYgMpkMUGBrXfm6E9pFmrn5at3</td>
													<td className="mdl-data-table__cell--non-numeric">Some BTC</td>
													<td>
														<a href="#" className="action-icon"><EditorModeEdit /></a>
														<a href="#" className="action-icon"><ActionDelete /></a>
													</td>
												</tr>
												<tr>
													<td className="mdl-data-table__cell--non-numeric">1JeK3CgCuPHVw9S5niUj4D7HFJ5bXc1JYR</td>
													<td className="mdl-data-table__cell--non-numeric">BTC-Income</td>
													<td>
														<a href="#" className="action-icon"><EditorModeEdit /></a>
														<a href="#" className="action-icon"><ActionDelete /></a>
													</td>
												</tr>
												<tr>
													<td className="mdl-data-table__cell--non-numeric">3BUp6EH8Vs2BAYsPQCLX8hdo8oyFpM28R9</td>
													<td className="mdl-data-table__cell--non-numeric">ETH-Alice</td>
													<td>
														<a href="#" className="action-icon"><EditorModeEdit /></a>
														<a href="#" className="action-icon"><ActionDelete /></a>
													</td>
												</tr>*/}
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
	}
}


class MyAddresses extends React.Component {
	constructor(props) {
		super(props)
	}

	triggerDialogModal(params){
		this.refs.dialog.handleOpen(params);
	}

	render() {
		const { userAddressesList, onAddAddressesClick, newAddressesValue, updateAddressesValue, onRefreshAddressClick, onDeleteAddressClick, handleModalOnSubmit, isRefreshUserAddressList } = this.props
		return(
			<article className="article">
				<h2 className="article-title">Addresses</h2>
				
				<div className="row">
					<div className="col-lg-8">
						<div>
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
													<When condition={ isRefreshUserAddressList }>
														<tr>
															<td colSpan="4" className="text-center">
																<CircularProgress size={30} thickness={3} />
															</td>
														</tr>
													</When>
													<Otherwise>
												
														<Choose>
															<When condition={ userAddressesList && userAddressesList.length > 0 }>
																{ userAddressesList.map(userAddressesListItem =>
																	<tr key={ userAddressesListItem.id }>
																		<td className="mdl-data-table__cell--non-numeric">{userAddressesListItem.nickName}</td>
																		<td className="mdl-data-table__cell--non-numeric">{userAddressesListItem.address}</td>
																		<td>{userAddressesListItem.balance} {userAddressesListItem.currency}</td>
																		<td>
																			<NicknameDialog ref="dialog" handleModalOnSubmit={handleModalOnSubmit}/>								
																			<a href="#" onClick={ onRefreshAddressClick.bind(this, userAddressesListItem.id) } className="action-icon"><ActionCached /></a>
																			<a href="#" onClick={ this.triggerDialogModal.bind(this, {id: userAddressesListItem.id, address: userAddressesListItem.address, oldNickname: userAddressesListItem.nickName }) } className="action-icon"><EditorModeEdit /></a>
																			<a href="#" onClick={ onDeleteAddressClick.bind(this, userAddressesListItem.id) } className="action-icon"><ActionDelete /></a>
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
													</Otherwise>
												</Choose>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>

						<div>
							<div className="box box-default">
								<div className="box-header box-header-primary">{'Associated Addresses'}</div>
								<div className="box-body">
									<p>These addresses were found in the transaction histories of the addresses you added.</p>
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
												{/*<Choose>
													<When condition={ this.state.selectedWallet.Transactions &&  this.state.selectedWallet.Transactions.length > 0}>
														{this.state.selectedWallet.Transactions.map(transaction =>
															<tr key={transaction.id}>
																<td className="mdl-data-table__cell--non-numeric">Sample Nickname</td>
																<td className="mdl-data-table__cell--non-numeric">{transaction.destination}</td>
																<td>{transaction.amount} {transaction.asset}</td>
																<td>
																	<a href="#" className="action-icon"><ActionCached /></a>
																	<a href="#" className="action-icon"><ActionDelete/></a>
																</td>
															</tr>
														)}
													</When>
													<Otherwise>
														<tr>
															<td colSpan="4" className="text-center">No associated addresses found.</td>
														</tr>
													</Otherwise>
												</Choose>*/}
												<tr>
													<td className="mdl-data-table__cell--non-numeric">Some BTC</td>
													<td className="mdl-data-table__cell--non-numeric">145J2KWhnYgMpkMUGBrXfm6E9pFmrn5at3</td>
													<td>12.4542 BTC</td>
													<td>
														<a href="#" className="action-icon"><EditorModeEdit /></a>
													</td>
												</tr>
												<tr>
													<td className="mdl-data-table__cell--non-numeric">BTC-Income</td>
													<td className="mdl-data-table__cell--non-numeric">1JeK3CgCuPHVw9S5niUj4D7HFJ5bXc1JYR</td>
													<td>128.1024 BTC</td>
													<td>
														<a href="#" className="action-icon"><EditorModeEdit /></a>
													</td>
												</tr>
												<tr>
													<td className="mdl-data-table__cell--non-numeric">ETH-Alice</td>
													<td className="mdl-data-table__cell--non-numeric">3BUp6EH8Vs2BAYsPQCLX8hdo8oyFpM28R9</td>
													<td>46.2398 ETH</td>
													<td>
														<a href="#" className="action-icon"><EditorModeEdit /></a>
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
	}
}

const PageAccountViewInner = (props) => {
	const { onSelectionSubmit, onSelectionChange, onDeleteClick, onRefreshClick, 
					selectedProvider, providerList, userProviderList, userAddressesList, 
					onAddAddressesClick, newAddressesValue, updateAddressesValue, onRefreshAddressClick, onDeleteAddressClick, handleModalOnSubmit, isRefreshUserAddressList, isRefreshUserWalletList } = props;
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
					userProviderList={ userProviderList }
					isRefreshUserWalletList={isRefreshUserWalletList} />
				</div>
        <div key="2"><MyAddresses 
					userAddressesList={ userAddressesList }
					onAddAddressesClick={ onAddAddressesClick }
					newAddressesValue={ newAddressesValue }
					updateAddressesValue={ updateAddressesValue }
					onRefreshAddressClick={ onRefreshAddressClick }
					onDeleteAddressClick={ onDeleteAddressClick }
					handleModalOnSubmit={handleModalOnSubmit}
					isRefreshUserAddressList={isRefreshUserAddressList} />

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
	updateAddressesValue: React.PropTypes.func.isRequired,
	onRefreshAddressClick: React.PropTypes.func.isRequired,
	onDeleteAddressClick: React.PropTypes.func.isRequired
};

export default PageAccountViewInner;
