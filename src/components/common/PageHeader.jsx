import { motion } from "framer-motion";

export default function PageHeader({
  title,
  subtitle,
  buttonText,
  buttonIcon: ButtonIcon,
  onButtonClick,
  children,
  actions,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-wrap items-center justify-between gap-1.5 mb-2"
    >
      {/* Left Content */}
      <div className="leading-none">
        <h1 className="text-base font-semibold leading-none text-gray-900">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-0 text-[10px] leading-3 text-gray-500">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1">
        {children ? (
          children
        ) : actions ? (
          actions
        ) : (
          buttonText && (
            <button
              type="button"
              onClick={onButtonClick}
              className="
                flex
                h-7
                items-center
                gap-1
                rounded-md
                bg-blue-600
                px-3
                text-[10px]
                font-medium
                text-white
                shadow-sm
                transition
                hover:bg-blue-700
              "
            >
              {ButtonIcon && (
                <ButtonIcon className="h-3 w-3" />
              )}

              {buttonText}
            </button>
          )
        )}
      </div>
    </motion.div>
  );
}