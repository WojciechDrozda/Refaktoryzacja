const giphyApiUrl = 'https://api.giphy.com';
const giphyPubKey = '9af6d92a7b0d48a4812c800105edda24';

App = React.createClass({

	getInitialState() {
		return {
			loading: false,
			searchingText: '',
			gif: {}
		};
	},


	handleSearch: function(searchingText) {
		this.setState({
			loading: true
		});
		this.getGif(searchingText).then((gif) => {
			this.setState({
				loading: false,
				gif: gif,
				searchingText: searchingText
			});
		});
	},

	getGif: function(searchingText) {
		return new Promise ((resolve, reject) => {
		const url = giphyApiUrl + '/v1/gifs/random?api_key=' + giphyPubKey + '&tag=' + searchingText;
		let xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.onload = function() {
			if (xhr.status === 200) {
				let data = JSON.parse(xhr.responseText).data;
				let gif = {
					url: data.fixed_width_downsampled_url,
					sourceUrl: data.url
				};
				resolve(gif);
			}
		};
		xhr.send();
	})
},

	render: function() {
		let styles = {
			margin: '0 auto',
			textAlign: 'center',
			width: '90%'
		};

		return (
			<div style={styles}>
				<h1>Wyszukiwarka GIFow!</h1>
				<p>Znajdz gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne  gify.</p>
				<Search onSearch={this.handleSearch}/>
			   <Gif 
			   		loading={this.state.loading} 
			   		url={this.state.gif.url} 
			  		sourceUrl={this.state.gif.sourceUrl}
			   	/>
			</div>
		);
	}
});