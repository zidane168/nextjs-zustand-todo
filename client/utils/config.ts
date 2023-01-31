interface IEnvConfig {
    DEVELOPMENT: {},
    STAGING: {},
    PRODUCTION: {}
}

const configEnv: IEnvConfig = {
    DEVELOPMENT: {
        API_PATH: "http://localhost:8000",
    },

    STAGING: {
        API_PATH: "http://localhost:8001",
    },

    PRODUCTION: {

    }
}

const env = process.env.REACT_APP_ENV || "DEVELOPMENT"

export const sitePrefix = "todo_";
export const envConfig = configEnv[env];

console.log(envConfig)