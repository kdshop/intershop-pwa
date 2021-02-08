import { Component, HostBinding } from '@angular/core';

import { SfeMetadata } from './sfe.types';

/**
 * Base class for all components that need SFE metadata attached to their DOM elements.
 * The CMS artifact containers (Pagelet, Slot, Include) extend this class to get the SFE capabilities.
 *
 * @example
 * export class ContentArtifactContainerComponent extends SfeMetadataWrapper {
 *              ngOnInit() {
 *                this.setSfeMetadata(mySfeData);
 *              }
 * }
 */

/* eslint-disable @typescript-eslint/tslint/config */
/* eslint-disable @angular-eslint/component-class-suffix */
@Component({ template: '' })
export class SfeMetadataWrapper {
  @HostBinding('attr.data-sfe') sfeMetadataAttribute: string;

  /** Write SFE metadata to the host element of the component */
  setSfeMetadata(metadata: SfeMetadata) {
    this.sfeMetadataAttribute = JSON.stringify(metadata);
  }
}
