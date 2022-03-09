# RW Scripts

This is a fork of [kcd-scripts](https://github.com/kentcdodds/kcd-scripts#readme) meant for my own projects in a way that I don't think would be accepted upstream since it involves different configurations and tools that are very niche-specific.

## The differences

* `rw-scripts` uses `eslint-config-google` as the main config instead of `eslint-config-kentcdodds` and subprojects
* As a result of the change, there is more eslint configuration in `rw-scripts` `package.json` file
* `rw-scripts` adds the following WordPress-specific tools:
  * `@wordpress/env`, a tool to facilitate testing and development of WordPress plugins and themes
  * `@wordpress/create-block` to automate the creation of WordPress block plugins

## LICENSE

MIT
