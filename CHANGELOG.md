# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="3.2.1"></a>
## [3.2.1](https://github.com/ZengineHQ/zn-backend-http/compare/3.2.0...3.2.1) (2019-09-16)



<a name="3.2.0"></a>
# [3.2.0](https://github.com/ZengineHQ/zn-backend-http/compare/3.1.0...3.2.0) (2019-09-16)


### Features

* queryRecords method ([619d8be](https://github.com/ZengineHQ/zn-backend-http/commit/619d8be))



<a name="3.1.0"></a>
# [3.1.0](https://github.com/ZengineHQ/zn-backend-http/compare/3.0.0...3.1.0) (2019-09-13)


### Features

* retry updates that fail due to object version ([8eca863](https://github.com/ZengineHQ/zn-backend-http/commit/8eca863))



<a name="3.0.0"></a>
# [3.0.0](https://github.com/ZengineHQ/zn-backend-http/compare/2.0.0...3.0.0) (2019-03-14)


### Features

* allow pass reference to znHttp ([be663d5](https://github.com/ZengineHQ/zn-backend-http/commit/be663d5))


### BREAKING CHANGES

* library returns a function instead of an object now.

Before:
Api = require('@zenginehq/backend-http');
Api.moveRecord(formId, recordId, folderId);

After:

Api = require('@zenginehq/backend-http');
znHttp = require('zn-http')();
Api(znHttp).moveRecord(formId, recordId, folderId);

- makes it work nicely with zengo
- allows for easier unit testing, so znHttp can be stubbed



<a name="2.0.0"></a>
# [2.0.0](https://github.com/ZengineHQ/zn-backend-http/compare/v1.2.3...v2.0.0) (2019-02-14)


### Features

* get paginated records based on limit param for EZ batch processing ([d34703e](https://github.com/ZengineHQ/zn-backend-http/commit/d34703e))



<a name="1.2.3"></a>
## 1.2.3 (2018-10-17)



<a name="1.2.2"></a>
## 1.2.2 (2018-10-17)


### Bug Fixes

* fetchbatched extra call not sending path ([1ab46c9](https://github.com/ZengineHQ/zn-backend-http/commit/1ab46c9))



<a name="1.2.1"></a>
## 1.2.1 (2018-07-23)


### Bug Fixes

* batched fetch regression ([c384ab3](https://github.com/ZengineHQ/zn-backend-http/commit/c384ab3))



<a name="1.2.0"></a>
# 1.2.0 (2018-06-28)


### Features

* add a convenience method for loading activities by id ([dac6ea8](https://github.com/ZengineHQ/zn-backend-http/commit/dac6ea8))
* add a convenience method for loading records by id ([37cfc58](https://github.com/ZengineHQ/zn-backend-http/commit/37cfc58))
* add a convenience method to load a form ([2328db3](https://github.com/ZengineHQ/zn-backend-http/commit/2328db3))
* add create/update/delete helpers for records ([8345dfc](https://github.com/ZengineHQ/zn-backend-http/commit/8345dfc))
* convenience function to move a record to a given folder ([efd6ccc](https://github.com/ZengineHQ/zn-backend-http/commit/efd6ccc))



<a name="1.1.1"></a>
## 1.1.1 (2018-06-11)


### Bug Fixes

* relative path to znHttp different with org-scoped package ([f57bdb4](https://github.com/ZengineHQ/zn-backend-http/commit/f57bdb4))



<a name="1.1.0"></a>
# 1.1.0 (2018-06-11)


### Bug Fixes

* regression in helper method renaming ([11ce32b](https://github.com/ZengineHQ/zn-backend-http/commit/11ce32b))
* returned records when no results ([db3584d](https://github.com/ZengineHQ/zn-backend-http/commit/db3584d))
* typo ([02d7fa7](https://github.com/ZengineHQ/zn-backend-http/commit/02d7fa7))


### Features

* helper to deal with api errors ([b8c81ed](https://github.com/ZengineHQ/zn-backend-http/commit/b8c81ed))
* helper to format response data ([9635a28](https://github.com/ZengineHQ/zn-backend-http/commit/9635a28))
* helper to make batched api calls ([c36bc8e](https://github.com/ZengineHQ/zn-backend-http/commit/c36bc8e))



<a name="1.2.2"></a>
## 1.2.2 (2018-10-17)


### Bug Fixes

* fetchbatched extra call not sending path ([1ab46c9](https://github.com/ZengineHQ/zn-backend-http/commit/1ab46c9))



<a name="1.2.1"></a>
## 1.2.1 (2018-07-23)


### Bug Fixes

* batched fetch regression ([c384ab3](https://github.com/ZengineHQ/zn-backend-http/commit/c384ab3))



<a name="1.2.0"></a>
# 1.2.0 (2018-06-28)


### Features

* add a convenience method for loading activities by id ([dac6ea8](https://github.com/ZengineHQ/zn-backend-http/commit/dac6ea8))
* add a convenience method for loading records by id ([37cfc58](https://github.com/ZengineHQ/zn-backend-http/commit/37cfc58))
* add a convenience method to load a form ([2328db3](https://github.com/ZengineHQ/zn-backend-http/commit/2328db3))
* add create/update/delete helpers for records ([8345dfc](https://github.com/ZengineHQ/zn-backend-http/commit/8345dfc))
* convenience function to move a record to a given folder ([efd6ccc](https://github.com/ZengineHQ/zn-backend-http/commit/efd6ccc))



<a name="1.1.1"></a>
## 1.1.1 (2018-06-11)


### Bug Fixes

* relative path to znHttp different with org-scoped package ([f57bdb4](https://github.com/ZengineHQ/zn-backend-http/commit/f57bdb4))



<a name="1.1.0"></a>
# 1.1.0 (2018-06-11)


### Bug Fixes

* regression in helper method renaming ([11ce32b](https://github.com/ZengineHQ/zn-backend-http/commit/11ce32b))
* returned records when no results ([db3584d](https://github.com/ZengineHQ/zn-backend-http/commit/db3584d))
* typo ([02d7fa7](https://github.com/ZengineHQ/zn-backend-http/commit/02d7fa7))


### Features

* helper to deal with api errors ([b8c81ed](https://github.com/ZengineHQ/zn-backend-http/commit/b8c81ed))
* helper to format response data ([9635a28](https://github.com/ZengineHQ/zn-backend-http/commit/9635a28))
* helper to make batched api calls ([c36bc8e](https://github.com/ZengineHQ/zn-backend-http/commit/c36bc8e))



<a name="1.2.1"></a>
## 1.2.1 (2018-07-23)


### Bug Fixes

* batched fetch regression ([c384ab3](https://github.com/ZengineHQ/zn-backend-http/commit/c384ab3))



<a name="1.2.0"></a>
# 1.2.0 (2018-06-28)


### Features

* add a convenience method for loading activities by id ([dac6ea8](https://github.com/ZengineHQ/zn-backend-http/commit/dac6ea8))
* add a convenience method for loading records by id ([37cfc58](https://github.com/ZengineHQ/zn-backend-http/commit/37cfc58))
* add a convenience method to load a form ([2328db3](https://github.com/ZengineHQ/zn-backend-http/commit/2328db3))
* add create/update/delete helpers for records ([8345dfc](https://github.com/ZengineHQ/zn-backend-http/commit/8345dfc))
* convenience function to move a record to a given folder ([efd6ccc](https://github.com/ZengineHQ/zn-backend-http/commit/efd6ccc))



<a name="1.1.1"></a>
## 1.1.1 (2018-06-11)


### Bug Fixes

* relative path to znHttp different with org-scoped package ([f57bdb4](https://github.com/ZengineHQ/zn-backend-http/commit/f57bdb4))



<a name="1.1.0"></a>
# 1.1.0 (2018-06-11)


### Bug Fixes

* regression in helper method renaming ([11ce32b](https://github.com/ZengineHQ/zn-backend-http/commit/11ce32b))
* returned records when no results ([db3584d](https://github.com/ZengineHQ/zn-backend-http/commit/db3584d))
* typo ([02d7fa7](https://github.com/ZengineHQ/zn-backend-http/commit/02d7fa7))


### Features

* helper to deal with api errors ([b8c81ed](https://github.com/ZengineHQ/zn-backend-http/commit/b8c81ed))
* helper to format response data ([9635a28](https://github.com/ZengineHQ/zn-backend-http/commit/9635a28))
* helper to make batched api calls ([c36bc8e](https://github.com/ZengineHQ/zn-backend-http/commit/c36bc8e))



<a name="1.2.0"></a>
# 1.2.0 (2018-06-28)


### Features

* add a convenience method for loading activities by id ([dac6ea8](https://github.com/ZengineHQ/zn-backend-http/commit/dac6ea8))
* add a convenience method for loading records by id ([37cfc58](https://github.com/ZengineHQ/zn-backend-http/commit/37cfc58))
* add a convenience method to load a form ([2328db3](https://github.com/ZengineHQ/zn-backend-http/commit/2328db3))
* add create/update/delete helpers for records ([8345dfc](https://github.com/ZengineHQ/zn-backend-http/commit/8345dfc))
* convenience function to move a record to a given folder ([efd6ccc](https://github.com/ZengineHQ/zn-backend-http/commit/efd6ccc))



<a name="1.1.1"></a>
## 1.1.1 (2018-06-11)


### Bug Fixes

* relative path to znHttp different with org-scoped package ([f57bdb4](https://github.com/ZengineHQ/zn-backend-http/commit/f57bdb4))



<a name="1.1.0"></a>
# 1.1.0 (2018-06-11)


### Bug Fixes

* regression in helper method renaming ([11ce32b](https://github.com/ZengineHQ/zn-backend-http/commit/11ce32b))
* returned records when no results ([db3584d](https://github.com/ZengineHQ/zn-backend-http/commit/db3584d))
* typo ([02d7fa7](https://github.com/ZengineHQ/zn-backend-http/commit/02d7fa7))


### Features

* helper to deal with api errors ([b8c81ed](https://github.com/ZengineHQ/zn-backend-http/commit/b8c81ed))
* helper to format response data ([9635a28](https://github.com/ZengineHQ/zn-backend-http/commit/9635a28))
* helper to make batched api calls ([c36bc8e](https://github.com/ZengineHQ/zn-backend-http/commit/c36bc8e))



<a name="1.1.1"></a>
## [1.1.1](https://github.com/ZengineHQ/zn-backend-http/compare/v1.1.0...v1.1.1) (2018-06-11)


### Bug Fixes

* relative path to znHttp different with org-scoped package ([f57bdb4](https://github.com/ZengineHQ/zn-backend-http/commit/f57bdb4))



<a name="1.1.0"></a>
# 1.1.0 (2018-06-11)


### Bug Fixes

* regression in helper method renaming ([11ce32b](https://github.com/ZengineHQ/zn-backend-http/commit/11ce32b))
* returned records when no results ([db3584d](https://github.com/ZengineHQ/zn-backend-http/commit/db3584d))
* typo ([02d7fa7](https://github.com/ZengineHQ/zn-backend-http/commit/02d7fa7))


### Features

* helper to deal with api errors ([b8c81ed](https://github.com/ZengineHQ/zn-backend-http/commit/b8c81ed))
* helper to format response data ([9635a28](https://github.com/ZengineHQ/zn-backend-http/commit/9635a28))
* helper to make batched api calls ([c36bc8e](https://github.com/ZengineHQ/zn-backend-http/commit/c36bc8e))
