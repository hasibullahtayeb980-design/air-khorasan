import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { CheckCircle, Flag01, Flag05, UserPlus01, X } from "@untitledui/icons";
import type { ReactNode, SVGProps } from "react";
import type React from "react";

interface Props extends SVGProps<SVGSVGElement> {
    color?: string;
    size?: number;
}

interface ModalProps {
  title: string;
  description: string;
  onCancel: () => void;
  icon: React.FC<Props>;
  children: ReactNode;
  visible: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  onCancel,
  icon,
  children,
  visible,
}) => {
  if (!visible) return null;

  return (
      <div className="fixed inset-0 z-50 flex min-h-dvh w-full items-end justify-center bg-overlay/70 px-4 outline-hidden backdrop-blur-[6px] sm:items-center sm:justify-center sm:px-8 pt-(--modal-pt) pb-(--modal-pb) [--modal-pb:clamp(16px,8vh,64px)] [--modal-pt:16px] sm:[--modal-pb:32px] sm:[--modal-pt:32px]">
        <div className="rounded-xl bg-primary align-middle shadow-xl outline-hidden max-sm:overflow-y-auto sm:rounded-2xl max-h-[calc(var(--visual-viewport-height)-var(--modal-pt)-var(--modal-pb))] sm:max-w-160">
          <section className="relative max-h-[inherit] w-full overflow-y-auto outline-hidden">
            <div className="relative">
              <div className="flex flex-row justify-between gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                <div className="relative w-max max-sm:hidden">
                    <div className="relative flex shrink-0 items-center justify-center *:data-icon:size-5 bg-primary shadow-xs-skeuomorphic ring-1 ring-primary ring-inset size-10 rounded-lg text-fg-secondary">
                        <FeaturedIcon
                          icon={icon}
                          color="gray"
                          theme="modern"
                          size="md"
                        />
                    </div>
                </div>

                <Button
                  onClick={onCancel}
                  color="tertiary"
                  size="sm"
                  iconLeading={X}
                  aria-label="Close Modal"
                />
              </div>

              <div className="h-5 w-full"></div>

              <div className="px-4 sm:px-6 z-10 flex flex-col gap-0.5">
                <h2 slot="title" className="text-md font-semibold text-primary">
                  {title}
                </h2>

                <p className="text-sm text-tertiary">
                  {description}
                </p>

                <div className="h-5 w-full"></div>
              </div>

              <div role="group" aria-roledescription="slide" className="min-w-0 shrink-0 grow-0 basis-full grid w-full grid-cols-1 items-start justify-start gap-4 px-4 sm:grid-cols-[280px_1fr] sm:px-6">
                {children}
              </div>
            </div>
          </section>
        </div>
      </div> 
  );
}