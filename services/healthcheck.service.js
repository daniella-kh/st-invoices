
const healthcheck = async () => {

	//todo: add google bucket, remove others
	const status = {}
	const ready = true;
	return { ready, status };
};

module.exports = healthcheck;
