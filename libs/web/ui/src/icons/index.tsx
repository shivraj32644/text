import { type SVGProps } from 'react';
import classNames from 'classnames';

export { ReactComponent as BalanceIcon } from './balance.svg';
export { ReactComponent as DashboardIcon } from './dashboard.svg';
export { ReactComponent as FixedDepositIcon } from './fixed-deposit.svg';
export { ReactComponent as MutualFundsIcon } from './mutual-funds.svg';
export { ReactComponent as MoreIcon } from './more.svg';
export { ReactComponent as WatchListIcon } from './watchlist.svg';
export { ReactComponent as NotificationIcon } from './notification.svg';
export { ReactComponent as FilterIcon } from './filter.svg';
export { ReactComponent as PdfIcon } from './pdf.svg';
import { ReactComponent as ArrowDownCircleIcon } from './arrow-down-circle.svg';
export { ReactComponent as LockIcon } from './lock.svg';
export { ReactComponent as PercentIcon } from './percent.svg';
export { ReactComponent as ReviewIcon } from './review.svg';
export { ReactComponent as HourglassIcon } from './hourglass.svg';
export { ReactComponent as BulbIcon } from './bulb.svg';
export { ReactComponent as EditIcon } from './edit.svg';
export { ReactComponent as EyeIcon } from './eye.svg';
export { ReactComponent as StarIcon } from './star.svg';
export { ReactComponent as SideBarProfileAvatar } from './side-bar-profile-avatar.svg';
export { ReactComponent as LogoutIcon } from './logout.svg';
export { ReactComponent as LandScapeSmallIcon } from './land-scape-small.svg';
export { ReactComponent as ArrowDownCircleBrandFillIcon } from './arrow-down-circle-brand-fill.svg';
export { ReactComponent as BlackCrossCircle } from './black-cross-circle.svg';
export { ReactComponent as CrossIcon } from './cross-icon.svg';
export { ReactComponent as BrandPlusAddIcon } from './brand-plus-add.svg';
export { ReactComponent as RoundErrorCircleIcon } from './round-error-circle.svg';
export { ReactComponent as RoundSuccessCircleIcon } from './round-success-circle.svg';
export { ReactComponent as HamburgerMenuIcon } from './hamburger-menu.svg';
export { ReactComponent as TriangleUpIcon } from './triangle-up.svg';
export { ReactComponent as TriangleDownIcon } from './triangle-down.svg';
export { ReactComponent as ChevronCircleArrowIcon } from './chevron-circle-arrow.svg';
export { ReactComponent as QuestionMarkIcon } from './question-mark.svg';
export { ReactComponent as DustbinIcon } from './dustbin.svg';
export { ReactComponent as GridSquareIcon } from './grid.svg';
export { ReactComponent as ListIcon } from './list.svg';
export { ReactComponent as SearchIcon } from './search.svg';
export { ReactComponent as InfoCircleIcon } from './info-circle-icon.svg';
export { ReactComponent as CircularEclipse } from './circular-eclipse.svg';
export { ReactComponent as ClientsAvatar } from './clients-avatar.svg';
export { ReactComponent as ApprovalBookIcon } from './approval-book.svg';
export { ReactComponent as BrandEyeIcon } from './brand-eye.svg';
export { ReactComponent as DownloadUnderLineIcon } from './download-underline.svg';
export { ReactComponent as DustbinBrandIcon } from './dustbin_icon.svg';
export { ReactComponent as ChevronIcon } from './chevron.svg';
export { ReactComponent as UploadDocumentIcon } from './upload_document.svg';
export { ReactComponent as SpinnerIcon } from './spinner.svg';
export { ReactComponent as PasswordVisibleIcon } from './password-visible-eye.svg';
export { ReactComponent as PasswordNotVisibleIcon } from './password-not-visible-eye.svg';
export { ReactComponent as LeftArrowBoxIcon } from './left-arrow-box.svg';
export { ReactComponent as CalendarIcon } from './calendar.svg';
export { ReactComponent as CalendarBrandIcon } from './calendar-icon.svg';
export { ReactComponent as FacebookIcon } from './facebook.svg';
export { ReactComponent as TwitterIcon } from './twitter.svg';
export { ReactComponent as LinkedinIcon } from './linkedin.svg';
export { ReactComponent as CorporateCANStep1 } from './corporate-can-step-1.svg';
export { ReactComponent as CorporateCANStep2 } from './corporate-can-step-2.svg';
export { ReactComponent as CorporateCANStep3 } from './corporate-can-step-3.svg';
export { ReactComponent as CorporateCANStep4 } from './corporate-can-step-4.svg';

export { ArrowDownCircleIcon };
export function ArrowUpCircleIcon({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <ArrowDownCircleIcon
      className={classNames('rotate-180', className)}
      {...props}
    />
  );
}
