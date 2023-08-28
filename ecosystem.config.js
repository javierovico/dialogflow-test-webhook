module.exports = {
    apps: [{
        name: "bnfWebhook",
        script: "dist/main.js", // Ruta al archivo de entrada compilado de tu aplicación
        instances: 1, // Puedes ajustar la cantidad de instancias según tus necesidades
        exec_mode: "fork", // Ejecución en modo "fork"
        watch: false, // Cambia a true si deseas que PM2 observe cambios y reinicie automáticamente
        env: {
            NODE_ENV: "production",
        },
    }],
};
