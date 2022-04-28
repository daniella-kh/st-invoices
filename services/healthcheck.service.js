
const healthcheck = async () => {

	//todo: add google bucket, remove others
	const status = {

	}
	const ready = status.sql && status.mongo;
	return { ready, status };
};

module.exports = healthcheck;
