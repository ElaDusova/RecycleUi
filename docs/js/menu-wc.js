'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">recycle-ui documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AboutUsPageComponent.html" data-type="entity-link" >AboutUsPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AddArticlesPageComponent.html" data-type="entity-link" >AddArticlesPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ArticleDetailComponent.html" data-type="entity-link" >ArticleDetailComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ArticleDetailPageComponent.html" data-type="entity-link" >ArticleDetailPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ContainerCreateComponent.html" data-type="entity-link" >ContainerCreateComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ContainerDetailComponent.html" data-type="entity-link" >ContainerDetailComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ContainerDetailPageComponent.html" data-type="entity-link" >ContainerDetailPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ContainerListComponent.html" data-type="entity-link" >ContainerListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ContainerListPageComponent.html" data-type="entity-link" >ContainerListPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DefaultComponent.html" data-type="entity-link" >DefaultComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ForgotPasswordPageComponent.html" data-type="entity-link" >ForgotPasswordPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HomePageComponent.html" data-type="entity-link" >HomePageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginPageComponent.html" data-type="entity-link" >LoginPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LogoutPageComponent.html" data-type="entity-link" >LogoutPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MaterialCreateComponent.html" data-type="entity-link" >MaterialCreateComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NotFoundPageComponent.html" data-type="entity-link" >NotFoundPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PartCreateComponent.html" data-type="entity-link" >PartCreateComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductAddPageComponent.html" data-type="entity-link" >ProductAddPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductCreateComponent.html" data-type="entity-link" >ProductCreateComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductDetailComponent.html" data-type="entity-link" >ProductDetailComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductDetailPageComponent.html" data-type="entity-link" >ProductDetailPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductSearchPageComponent.html" data-type="entity-link" >ProductSearchPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RegisterPageComponent.html" data-type="entity-link" >RegisterPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ResetPasswordPageComponent.html" data-type="entity-link" >ResetPasswordPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserAccountPageComponent.html" data-type="entity-link" >UserAccountPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UtilitiesAddPageComponent.html" data-type="entity-link" >UtilitiesAddPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ValidationPageComponent.html" data-type="entity-link" >ValidationPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ValidationProductsPageComponent.html" data-type="entity-link" >ValidationProductsPageComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ArticleService.html" data-type="entity-link" >ArticleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ContainerService.html" data-type="entity-link" >ContainerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MaterialService.html" data-type="entity-link" >MaterialService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PartService.html" data-type="entity-link" >PartService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductService.html" data-type="entity-link" >ProductService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/ArticleDetailResolver.html" data-type="entity-link" >ArticleDetailResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/ArticleListResolver.html" data-type="entity-link" >ArticleListResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/ContainerDetailResolver.html" data-type="entity-link" >ContainerDetailResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/ContainerListResolver.html" data-type="entity-link" >ContainerListResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/ProductCreateResolver.html" data-type="entity-link" >ProductCreateResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/ProductDetailResolver.html" data-type="entity-link" >ProductDetailResolver</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AccountDetail.html" data-type="entity-link" >AccountDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ArticleCreateModel.html" data-type="entity-link" >ArticleCreateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ArticleDetail.html" data-type="entity-link" >ArticleDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ContainerCreate.html" data-type="entity-link" >ContainerCreate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ContainerDetail.html" data-type="entity-link" >ContainerDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ContainerSimple.html" data-type="entity-link" >ContainerSimple</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ContainerView.html" data-type="entity-link" >ContainerView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EmailUpdate.html" data-type="entity-link" >EmailUpdate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ForgottenPasswordUpdate.html" data-type="entity-link" >ForgottenPasswordUpdate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IdNameModel.html" data-type="entity-link" >IdNameModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IdNameModel-1.html" data-type="entity-link" >IdNameModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JsonPatchDocument.html" data-type="entity-link" >JsonPatchDocument</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginModel.html" data-type="entity-link" >LoginModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MaterialCreate.html" data-type="entity-link" >MaterialCreate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MaterialDetail.html" data-type="entity-link" >MaterialDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MaterialSimple.html" data-type="entity-link" >MaterialSimple</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MaterialSimple-1.html" data-type="entity-link" >MaterialSimple</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PartCreate.html" data-type="entity-link" >PartCreate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PartDetail.html" data-type="entity-link" >PartDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PartSimple.html" data-type="entity-link" >PartSimple</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PartUpdate.html" data-type="entity-link" >PartUpdate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PasswordUpdate.html" data-type="entity-link" >PasswordUpdate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductCreate.html" data-type="entity-link" >ProductCreate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductDetail.html" data-type="entity-link" >ProductDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductPartUpdate.html" data-type="entity-link" >ProductPartUpdate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductUpdate.html" data-type="entity-link" >ProductUpdate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProfilePictureUpdate.html" data-type="entity-link" >ProfilePictureUpdate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegisterModel.html" data-type="entity-link" >RegisterModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UsernameUpdate.html" data-type="entity-link" >UsernameUpdate</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});