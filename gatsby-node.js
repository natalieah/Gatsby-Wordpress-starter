const _ = require(`lodash`);
const Promise = require(`bluebird`);
const path = require(`path`);
const slash = require(`slash`);

const pageQuery = `
{
  allWordpressPage {
    edges {
      node {
        id
        slug
        status
        template
      }
    }
  }
}
`

const postsQuery = `
{
  allWordpressPost {
    edges {
      node {
        id
        slug
        status
        template
        format
        date
        categories{
          name
          slug
        }
        tags{
          name
          slug
        }
      }
    }
  }
}
`


exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;


    return new Promise((resolve, reject) => {

        // Pages
        graphql(pageQuery)
            .then(result => {
                if (result.errors) {
                    console.log(result.errors);
                    reject(result.errors);
                }

                const pageTemplate = path.resolve("./src/templates/page.js");

                _.each(result.data.allWordpressPage.edges, edge => {
                    createPage({
                        path: `/${edge.node.slug}/`,
                        component: slash(pageTemplate),
                        context: {
                            id: edge.node.id,
                        },
                    });
                });
            })

            .then(() => {
                graphql(postsQuery)
                    .then(result => {
                        if (result.errors) {
                            console.log(result.errors);
                            reject(result.errors);
                        }
                        const postTemplate = path.resolve("./src/templates/post.js");
                        const blogTemplate = path.resolve("./src/pages/index.js");

                        const categories = []
                        const tags = []


                        // Create Posts
                        createPage({
                            path: `/`,
                            component: slash(blogTemplate)
                        });

                        _.each(result.data.allWordpressPost.edges, edge => {

                          _.each(edge.node.categories, category => {
                              categories.push(category)
                            })

                          _.each(edge.node.tags, tag => {
                              tags.push(tag)
                            })

                            createPage({
                                path: `/post/${edge.node.slug}/`,
                                component: slash(postTemplate),
                                context: {
                                    id: edge.node.id,
                                },
                            });
                        })

                        const categoriesTemplate = path.resolve("./src/templates/category.js");
                        const tagsTemplate = path.resolve(`./src/templates/tag.js`);

                        const uniqueCategories = _.uniqBy(categories, 'slug');
                        const uniqueTags = _.uniqBy(tags, 'slug')

                        _.each(uniqueCategories, cat => {

                          createPage({
                            path: `/categories/${cat.slug}/`,
                            component: slash(categoriesTemplate),
                            context: {
                              name: cat.name,
                              slug: cat.slug,
                            },
                          })
                        })
                        _.each(uniqueTags, tag => {

                          createPage({
                            path: `/tags/${tag.slug}/`,
                            component: slash(tagsTemplate),
                            context: {
                              name: tag.name,
                              slug: tag.slug,
                            },
                          })
                        })
                    });
            })
        // ==== END POSTS ====
        resolve();
    });
};
