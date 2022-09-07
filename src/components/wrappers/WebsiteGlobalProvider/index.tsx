import { SnackbarProvider } from 'notistack';
import PropTypes from 'prop-types';
import Menu from 'src/components/commons/Menu';
import { WebsitePageProvider } from 'src/providers/WebsitePageContext';
import { Props } from 'src/types/commons';

const WebsiteGlobalProvider = ({ children }: Props) => {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      maxSnack={3}
    >
      <WebsitePageProvider>
        <Menu />
        {children}
      </WebsitePageProvider>
    </SnackbarProvider>
  );
};

WebsiteGlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WebsiteGlobalProvider;
