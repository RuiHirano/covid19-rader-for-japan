import * as React from "react";
//import i18n from '../i18n/index'

export const checkErrorCode = (errorCode: string) => {
	switch (errorCode) {
		// signInWithEmailAndPassword
		case 'auth/invalid-email':
			return "メールアドレスが間違っています"
		case 'auth/user-disabled':
			return "i18n.t('er_user_disabled')"
		case 'auth/user-not-found':
			return "アカウントが見つかりませんでした"
		case 'auth/wrong-password':
			return "パスワードが間違っています"
		// createUserWithEmailAndPassword
		case 'auth/email-already-in-use':
			return "そのメールアドレスはすでに使われています"
		case 'auth/operation-not-allowed':
			return "i18n.t('er_operation_not_allowed')"
		case 'auth/weak-password':
			return "パスワードが脆弱です"
		case 'auth/too-many-requests':
			return "リクエスト上限を超えました。しばらく経ってからお試しください。"
		// update email
		case 'auth/requires-recent-login':
			return "i18n.t('er_requires_recent_login')"

		// storage

		// fireStore
		case 'cancelled':
			return "i18n.t('er_cancelled')"
		case 'unknown':
			return "i18n.t('er_unknown')"
		case 'invalid-argument':
			return "i18n.t('er_invalid-argument')"
		case 'deadline-exceeded':
			return "i18n.t('er_deadline_exceeded')"
		case 'not-found':
			return "i18n.t('er_not_found')"
		case 'already-exists':
			return "i18n.t('er_already_exists')"
		case 'permission-denied':
			return "i18n.t('er_permission_denied')"
		case 'resource-exhausted':
			return "i18n.t('er_resource_exhausted')"
		case 'failed-precondition':
			return "i18n.t('er_failed_precondition')"
		case 'aborted':
			return "i18n.t('er_aborted')"
		case 'out-of-range':
			return "i18n.t('er_out_of_range')"
		case 'unimplemented':
			return "i18n.t('er_unimplemented')"
		case 'internal':
			return "i18n.t('er_internal')"
		case 'unavailable':
			return "i18n.t('er_unavailable')"
		case 'data-loss':
			return "i18n.t('er_data_loss')"
		case 'unauthenticated':
			return "i18n.t('er_unauthenticated')"

		default:
			return "i18n.t('er_unknown_error')"
	}
}
