import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { CheckCircle, Flag01, Flag05, UserPlus01, X } from "@untitledui/icons";
import type { ReactNode } from "react";
import type React from "react";

interface ModalProps {
  onCancel: () => void;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  onCancel,
  children,
}) => {
    return (
        <div className="fixed inset-0 z-50 flex min-h-dvh w-full items-end justify-center bg-overlay/70 px-4 outline-hidden backdrop-blur-[6px] sm:items-center sm:justify-center sm:px-8 pt-(--modal-pt) pb-(--modal-pb) [--modal-pb:clamp(16px,8vh,64px)] [--modal-pt:16px] sm:[--modal-pb:32px] sm:[--modal-pt:32px]">
          <div className="rounded-xl bg-primary align-middle shadow-xl outline-hidden max-sm:overflow-y-auto sm:rounded-2xl max-h-[calc(var(--visual-viewport-height)-var(--modal-pt)-var(--modal-pb))] sm:max-w-160">
            <section className="relative max-h-[inherit] w-full overflow-y-auto outline-hidden">
              <div className="relative">
                <div className="flex flex-row justify-between gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                  <div className="relative w-max max-sm:hidden">
                      <div className="relative flex shrink-0 items-center justify-center *:data-icon:size-5 bg-primary shadow-xs-skeuomorphic ring-1 ring-primary ring-inset size-10 rounded-lg text-fg-secondary">
                          <FeaturedIcon
                            icon={Flag05}
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
                    Add customer
                  </h2>

                  <p className="text-sm text-tertiary">
                    Add a new customer to your database.
                  </p>

                  <div className="h-5 w-full"></div>
                </div>

                <div role="group" aria-roledescription="slide" className="min-w-0 shrink-0 grow-0 basis-full grid w-full grid-cols-1 items-start justify-start gap-4 px-4 sm:grid-cols-[280px_1fr] sm:px-6">
                  <div data-input-wrapper="true" data-input-size="md" className="group flex h-max w-full flex-col items-start justify-start gap-1.5 sm:col-span-2" data-rac="">
                    <Input
                      isRequired
                      label="Full Name"
                      hint="This is a hint text to help user."
                      placeholder="What is the full name of the customer?"
                      tooltip="This is a tooltip"
                    />
                  </div>

                  <Input
                    isRequired
                    label="Full Name"
                    hint="This is a hint text to help user."
                    placeholder="What is the full name of the customer?"
                    tooltip="This is a tooltip"
                  />

                  <Input
                    isRequired
                    label="Full Name"
                    hint="This is a hint text to help user."
                    placeholder="What is the full name of the customer?"
                    tooltip="This is a tooltip"
                  />
                </div>

                {children}
              </div>
            </section>
          </div>
        </div> 
    );
}