$(document).ready(function() {

	$('#backButton').on('click', function(e) {

		window.location.href = "./index.html"
	});

	$('#closeNotificationButton').on('click', function(e) {

		$('#notificationContent').addClass('is-hidden');
	});

	var optionsJSON = window.localStorage.getItem('options');
	var options = JSON.parse(optionsJSON);

	var outputPath = path.join(os.homedir(), 'Desktop', 'IVDImages')
	fs.emptyDirSync(outputPath)

	var create = function() {

		var chars = createChars();
		$('#progress').attr('max', chars.length);

		try {

			$.each(chars, (i, char) => {

				createImages(char);

				setTimeout(() => {

					$('#progress').attr('value', i + 1);
				}, 500);
			});

			$('#backButton').removeClass('is-loading');
		} catch (err) {

			$('#notification').text(err.message);
			$('#notificationContent').removeClass('is-hidden');
		}
	}

	var createChars = function() {

		var lines = fs.readFileSync('./IVD_Sequences.txt', 'utf8').split('\n');
		var availableLines = lines.filter((line) => {

			return 0 != line.length;
		}).filter((line) => {

			return 0 != line.indexOf('#');
		});
		var chars = availableLines.map((availableLine) => {

			return availableLine.split(/\s|;\s/);
		}).map((columns) => {

			return {
				'codePointHex': columns[0],
				'ivsCodePointHex': columns[1],
				'ivdCollectionName': columns[2],
				'ivdCollectionCharacterId': columns[3]
			};
		});

		return chars;
	}

	var createImages = function(char) {

		var sizeMap = options.size;

		$.each(sizeMap, (size, checked) => {

			if (!checked) return true;

			createImage(size, char);
		});
	}

	var createImage = function(size, char) {

		var codePointHex = char['codePointHex'];
		var ivsCodePointHex = char['ivsCodePointHex'];
		var codePoint = parseInt(codePointHex, 16);
		var ivsCodePoint = parseInt(ivsCodePointHex, 16);
		var charText = String.fromCodePoint(codePoint) + String.fromCodePoint(ivsCodePoint);

		var ivdCollectionName = char['ivdCollectionName'];
		var font = options.font[ivdCollectionName];

		var ivdCollectionCharacterId = char['ivdCollectionCharacterId'];

		var canvas = document.getElementById('canvas_' + size);
		var ctx = canvas.getContext('2d');

		setTimeout(() => {

			ctx.clearRect(0, 0, canvas.width, canvas.height);

			ctx.textBaseline = 'ideographic';
			ctx.font = size + "px " + font;
			ctx.fillStyle = 'hsl(0, 0%, 21%)';
			ctx.fillText(charText, 0, size);

			ctx.font = (parseInt(size) / 24) + "px " + font;
			ctx.fillStyle = 'hsl(0, 0%, 86%)';
			ctx.fillText('\u00a9\u0020\u0068\u0069\u0072\u006f\u0032\u0030\u0076', 0, size);

			var dataURL = canvas.toDataURL("image/png");
			var data = dataURL.replace(/^data:image\/\w+;base64,/, "");

			var imageOutputPath = path.join(outputPath, '' + size);
			fs.mkdirpSync(imageOutputPath);

			var imagePath = path.join(imageOutputPath, codePointHex + '-' + ivsCodePointHex + '.png');
			fs.writeFileSync(imagePath, data, 'base64');
		}, 500);
	}

	create();

});
