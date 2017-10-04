const giphyLoadingUrl = 'http://www.ifmo.ru/images/loader.gif';
let styles = {
	minHeight: '310px',
	margin: '0.5em'
};

Gif = React.createClass({
	getUrl: function() {
		return this.props.sourceUrl || giphyLoadingUrl;
	},
	render: function() {
		let url = this.props.loading ? giphyLoadingUrl : this.props.url;

		return (
			<div style={styles}>
				<a href={this.getUrl()} title='view this on giphy' target='new'>
					<img id='gif' src={url} style={{width: '100%', maxWidth: '350px'}}/>
				</a>
			</div>
		);
	}
});