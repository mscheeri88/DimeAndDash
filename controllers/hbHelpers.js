var hbHelpers = {
		currency : 	function (inputNumber) {
						return "$" + inputNumber.toFixed(2);
					}
	};

module.exports = hbHelpers;

