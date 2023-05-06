import { GridIcon, RightChevronIcon } from "@shared/ui/icons";
import { Link } from "@shared/ui/links";

import { SettingCard } from "./setting-card";

export const CategoriesSettingCard = () => {
  return (
    <Link to="/categories">
      <SettingCard
        title="Categories"
        description="Add and modify categories"
        icon={<GridIcon size="md" topRightSquareClassName="text-subtext0" />}
        rightAction={<RightChevronIcon size="sm" className="text-overlay1" />}
      />
    </Link>
  );
};
