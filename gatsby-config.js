module.exports = {
    siteMetadata: {
        title: 'Gatsby with Wordpress',
        subtitle: `Bare essentials gatsby-wordpress starter`,
    },
    plugins: [
        {
            resolve: "gatsby-source-wordpress",
            options: {
                // The base url to your WP site.
                baseUrl: "https://www.wpgatsbydemo.nataliegustafsson.fi/",
                // The protocol. This can be http or https.
                protocol: "https",
                 // WP.com sites set to true, WP.org set to false
                hostingWPCOM: false,
                // Use 'Advanced Custom Fields' Wordpress plugin
                useACF: true,
                // Set to true to debug endpoints on 'gatsby build'
                verboseOutput: false
            },
        },
    ],
};
