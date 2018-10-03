$(document).ready(function() {

	$("#nodeVer").text(process.versions.node);
	$("#chromeVer").text(process.versions.chrome);
	$("#electronVer").text(process.versions.electron);

	var options = {
		font: {
			"Adobe-Japan1": "HiraMinProN-W3",
			"Hanyo-Denshi": "IPAmjMincho",
			"Moji_Joho": "IPAmjMincho",
			"MSARG": "",
			"KRName": ""
		},
		size: {
			"72": false,
			"144": false,
			"288": true,
			"576": false,
			"1152": false
		}
	}

	var savedOptionsJSON = window.localStorage.getItem('options');
	if (savedOptionsJSON) {

		var savedOptions = JSON.parse(savedOptionsJSON);
		$.extend(options, savedOptions);
	}

	$('#input_Adobe-Japan1').val(options.font['Adobe-Japan1']);
	$('#input_Hanyo-Denshi').val(options.font['Hanyo-Denshi']);
	$('#input_Moji_Joho').val(options.font['Moji_Joho']);
	$('#input_MSARG').val(options.font['MSARG']);
	$('#input_KRName').val(options.font['KRName']);

	$('#input_72').prop('checked', options.size['72']);
	$('#input_144').prop('checked', options.size['144']);
	$('#input_288').prop('checked', options.size['288']);
	$('#input_576').prop('checked', options.size['576']);
	$('#input_1152').prop('checked', options.size['1152']);

	$('#createButton').on('click', function(e) {

		options.font['Adobe-Japan1'] = $('#input_Adobe-Japan1').val();
		options.font['Hanyo-Denshi'] = $('#input_Hanyo-Denshi').val();
		options.font['Moji_Joho'] = $('#input_Moji_Joho').val();
		options.font['MSARG'] = $('#input_MSARG').val();
		options.font['KRName'] = $('#input_KRName').val();

		options.size['72'] = $('#input_72').prop('checked');
		options.size['144'] = $('#input_144').prop('checked');
		options.size['288'] = $('#input_288').prop('checked');
		options.size['576'] = $('#input_576').prop('checked');
		options.size['1152'] = $('#input_1152').prop('checked');

		var optionsJSON = JSON.stringify(options);
		window.localStorage.setItem('options', optionsJSON);

		window.location.href = "./create.html"
	});

});
