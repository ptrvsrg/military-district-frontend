import { enqueueSnackbar } from 'notistack'

export function addAlert(message: string, variant: 'default' | 'error' | 'info' | 'success' | 'warning' | undefined) {
  enqueueSnackbar(message, {
    anchorOrigin: {
      horizontal: 'right',
      vertical: 'bottom',
    },
    autoHideDuration: 3000,
    preventDuplicate: true,
    variant,
  })
}
