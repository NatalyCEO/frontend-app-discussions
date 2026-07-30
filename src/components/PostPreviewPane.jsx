import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Button, Icon, IconButton } from '@edx/paragon';
import { Close } from '@edx/paragon/icons';

import messages from '../discussions/posts/post-editor/messages';
import HTMLLoader from './HTMLLoader';

function PostPreviewPane({
  htmlNode, intl, isPost, editExisting,
}) {
  const [showPreviewPane, setShowPreviewPane] = useState(false);

  return (
    <div className={`leti-post-preview-wrap ${showPreviewPane ? 'leti-post-preview-wrap--open w-100' : ''}`}>
      {showPreviewPane && (
        <div
          className={`w-100 p-2 bg-light-200 rounded box-shadow-down-1 post-preview ${isPost ? 'mt-2 mb-3' : 'my-3'}`}
          style={{ minHeight: '200px', wordBreak: 'break-word' }}
        >
          <IconButton
            onClick={() => setShowPreviewPane(false)}
            alt={intl.formatMessage(messages.actionsAlt)}
            src={Close}
            iconAs={Icon}
            size="inline"
            className="float-right p-3"
            iconClassNames="icon-size"
          />
          <HTMLLoader htmlNode={htmlNode} cssClassName="text-primary" />
        </div>
      )}
      <div className="leti-show-preview d-flex justify-content-md-end justify-content-start">
        {!showPreviewPane
        && (
          <Button
            variant="link"
            size="md"
            onClick={() => setShowPreviewPane(true)}
            className="text-primary-500 px-0"
          >
            {intl.formatMessage(messages.showPreviewButton)}
          </Button>
        )}
      </div>
    </div>
  );
}

PostPreviewPane.propTypes = {
  intl: intlShape.isRequired,
  htmlNode: PropTypes.node.isRequired,
  isPost: PropTypes.bool,
  editExisting: PropTypes.bool,
};

PostPreviewPane.defaultProps = {
  isPost: false,
  editExisting: false,
};

export default injectIntl(PostPreviewPane);
